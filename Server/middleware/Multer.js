import multer from "multer";

const uploads = multer({storage:multer.diskStorage({})})

export default uploads