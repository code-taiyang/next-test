// import fs from 'fs'
// import path from 'path'
// import matter from 'gray-matter'
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 根目录 + posts博客文件目录
const postDir = path.join(process.cwd(), "public/posts");

module.exports.getSortedPostData = function () {
  const fileNames = fs.readdirSync(postDir);
  const posts: any[] = [];
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

      posts.push({
        id,
        ...matterRes.data,
      });
    });
  } catch (error) {
    console.error("文件读取或者解析出错！");
  }

  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};
