import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isFullNumber, isKebabCase } from "@/utils/validate";
import { remark } from 'remark';
import html from 'remark-html';

// 根目录 + posts博客文件目录
const postDir = path.join(process.cwd(), "../DB/posts");

interface PostMetaData {
  author?: string;
  createTime?: string;
  updateTime?: string;
  title?: string;
}

export type PostData = PostMetaData & {
  id: string;
  htmlContent: string;
}

/**
 * 元数据校验
 * @param data 
 * @returns 
 */
const metaDataValidate = (data: PostMetaData): boolean => {
  let isValid = true;

  if(data.createTime && !isFullNumber(data.createTime)) {
    isValid = false;
    console.warn(`createTime :>> ${data.createTime}。需要时间戳格式`);
  }
  
  if(data.updateTime && !isFullNumber(data.updateTime)) {
    isValid = false;
    console.warn(`updateTime :>> ${data.createTime}。。需要时间戳格式`);
  }

  return isValid;
}

export function getPostList (): string[] {
  const fileNames = fs.readdirSync(postDir);
  const res: string[] = [];

  fileNames.forEach((file) => {
    const reg = /\.md$/;

    if (!reg.test(file)) {
      return console.warn(`${file} :>> 目录内必须是md文件！`);
    }

    const id = file.replace(reg, "");

    if(!isKebabCase(id)) {
      return console.warn(`${file} :>> 文件命名没有严格遵守kebab-case`);
    }

    res.push(id);
  });

  return res;
}

export async function getPostDataById(id: string): Promise<PostData | null> {
  if(!isKebabCase(id)) {
    console.warn(`${id} :>> 文件命名没有严格遵守kebab-case`);
    return null;
  }

  const fullPath = path.join(postDir, `${id}.md`);
  const isExist = fs.existsSync(fullPath);
  
  console.log("请求文件 :>>>>>> ", id);

  try {
    if(!isExist) {
      throw new Error(`不存在路径 :>> ${fullPath}`);
    }

    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterRes = matter(fileContents);

    if(!metaDataValidate(matterRes.data)) {
      throw new Error("元数据格式错误");
    }

    const htmlContent = (await remark().use(html).process(matterRes.content)).toString();
    const data = {
      id,
      ...matterRes.data,
      htmlContent: htmlContent
    }

    return data;
  } catch (error) {
    console.error("文件读取或者解析出错！:>> ", error);

    return null;
  }
  
}
