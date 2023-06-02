import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isKebabCase } from "@/utils/validate";
import { remark } from 'remark';
import html from 'remark-html';

// 根目录 + posts博客文件目录
const postDir = path.join(process.cwd(), "public/posts");

export type PostData = {
  id: string;
  htmlContent: string;
  author?: string;
  createTime?: string;
  modifyTime?: string;
  title?: string;
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
  
  if(!isExist) {
    console.error("不存在路径 :>> ${fullPath}");
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterRes = matter(fileContents);
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
