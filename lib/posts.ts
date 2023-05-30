import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 根目录 + posts博客文件目录
const postDir = path.join(process.cwd(), "public/posts");

export type PostData = {
  id: string;
  content: string;
  author?: string;
  createTime?: string;
  modifyTime?: string;
  title?: string;
}

export function getPostList () {

}

export function getPostDataById(){}

class PostDataProcessor {
  private postData: PostData[] | null;

  constructor(){
    this.postData = null;
  }

  getSortedPostData(){
    if(this.postData) {
      return this.postData;
    }

    const fileNames = fs.readdirSync(postDir);
    const posts: PostData[] = [];
    
    try {
      fileNames.forEach((file) => {
        const reg = /\.md$/;
  
        if (!reg.test(file)) {
          return console.warn("目录内必须是md文件！");
        }
  
        const id = file.replace(reg, "");
        const fullPath = path.join(postDir, file);
        const fileContents = fs.readFileSync(fullPath, "utf-8");
        const matterRes = matter(fileContents);
  
        const data = {
          id,
          ...matterRes.data,
          content: matterRes.content
        }
  
        posts.push(data);
      });
    } catch (error) {
      console.error("文件读取或者解析出错！");
    }

    return (this.postData = posts);
  }

  clear(){
    this.postData = null;
  }
}

const processor = new PostDataProcessor();

export function getPostDataProcessor(){
  return processor;
}