"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Directory = exports.File = void 0;

var _fs = _interopRequireDefault(require("fs"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const fs = _fs.default.promises;

//

class FileBase {




  constructor(arrRelativePath) {
    this.arrRelativePath = arrRelativePath;
    this.relativePath = arrRelativePath.join('/');
    this.name = arrRelativePath[arrRelativePath.length - 1];
  }}


class File extends FileBase {}exports.File = File;



class Directory extends FileBase {



  constructor(arrRelativePath) {
    super(arrRelativePath);

    this.arrContents = [];
  }}


/**
      * Manages reading of multiple files
      * @class MasterReader
      */exports.Directory = Directory;
class MasterReader {







  constructor(basePath) {
    this.basePath = basePath;

    this.directoriesByRelativePath = new Map();
    this.fileContentsByRelativePath = new Map();

    this.skipFile = fileName => false;
    this.arrAllFiles = [];
  }

  /**
     * Provides a function evaluating whether to skip a file, or not
     * @memberof MasterReader
     */
  setSkipFile(skipFile) {
    this.skipFile = skipFile;
  }

  async initialize() {
    // And read
    this.baseDir = await this.readDirectory([]);
  }

  async readDirectory(arrRelativePath) {
    const dir = new Directory(arrRelativePath);
    this.directoriesByRelativePath.set(dir.relativePath, dir);

    const dirContent = await fs.readdir(this.basePath + '/' + dir.relativePath);
    for (let fileName of dirContent) {
      // Skip DS store iles on mac
      if (fileName === '.DS_Store') continue;

      // Skip files according to passed function
      if (this.skipFile(fileName)) {
        continue;
      }

      // Skip . and .. directories
      if (fileName.substr(0, 1) === '.') {
        continue;
      }

      const stat = await fs.stat(this.basePath + '/' + dir.relativePath + '/' + fileName);

      let fileOrDirToAdd;

      if (stat.isFile()) {
        const file = new File(arrRelativePath.concat(fileName));

        fileOrDirToAdd = file;
      } else if (stat.isDirectory()) {
        const subDir = await this.readDirectory(arrRelativePath.concat(fileName));

        fileOrDirToAdd = subDir;
      } else
      throw new Error(
      'MasterReader: Neither file nor directory' + JSON.stringify(arrRelativePath));


      dir.arrContents.push(fileOrDirToAdd);
    }

    return dir;
  }

  async readFile(fileName) {
    const currentContent = this.fileContentsByRelativePath.get(fileName);

    if (currentContent) return currentContent;

    const newContent = (await fs.readFile(this.basePath + '/' + fileName, {
      encoding: 'utf8' })).
    toString();
    this.fileContentsByRelativePath.set(fileName, newContent);

    return newContent;
  }

  getAllFiles() {
    if (!this.baseDir) throw new Error();

    if (this.arrAllFiles.length > 0) return this.arrAllFiles;

    this.getAllFiledHelper(this.baseDir);

    return this.arrAllFiles;
  }

  getAllFiledHelper(dir) {
    for (let fileOrDirectory of dir.arrContents) {
      if (fileOrDirectory instanceof Directory) {
        // Sub-dir
        this.getAllFiledHelper(fileOrDirectory);
      } else if (fileOrDirectory instanceof File) {
        this.arrAllFiles.push(fileOrDirectory);
      }
    }
  }}exports.default = MasterReader;
//# sourceMappingURL=MasterReader.js.map