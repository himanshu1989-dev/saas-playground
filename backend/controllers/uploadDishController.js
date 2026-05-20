import fs from "node:fs";
import path from "node:path";
import Busboy from "busboy";

export function uploadDishController(req, res) {
  const uploadDirectory = "./uploads";
  const dishImagePath = path.join(uploadDirectory, "dish.jpg");

  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }

  const busboy = Busboy({
    headers: req.headers,
  });

  let fileSavePromise = null;

  busboy.on("file", (fieldName, file, fileInfo) => {
    console.log("Receiving file field:", fieldName);
    console.log("Original filename:", fileInfo.filename);
    console.log("MIME type:", fileInfo.mimeType);

    if (fieldName !== "dishImage") {
      file.resume();
      return;
    }

    fileSavePromise = new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(dishImagePath);

      file.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log("Image uploaded as:", dishImagePath);
        resolve();
      });

      writeStream.on("error", (error) => {
        reject(error);
      });
    });
  });

  busboy.on("finish", async () => {
    try {
      if (!fileSavePromise) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            error: "No image uploaded",
          }),
        );
        return;
      }

      await fileSavePromise;

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "Upload completed",
          fileName: "dish.jpg",
        }),
      );
    } catch (error) {
      console.error("Upload error:", error);

      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: "Failed to upload image",
        }),
      );
    }
  });

  busboy.on("error", (error) => {
    console.error("Busboy upload error:", error);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "Image upload failed",
      }),
    );
  });

  req.pipe(busboy);
}