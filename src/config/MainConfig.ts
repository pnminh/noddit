import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
const viewsFolder = path.join(__dirname,"..","views");
const assetsFolder = path.join(__dirname,"..","assets");
import fs from 'fs';
fs.readdirSync(viewsFolder).forEach(file => {
  console.log(file);
})
console.log(`viewsFolder:${viewsFolder}`)
export class MainConfig {
  static init(app:express.Express): void {
    dotenv.config();
    app.set("views",viewsFolder);
    app.set('view engine','ejs');
    app.use(express.static(assetsFolder));
  }
}
