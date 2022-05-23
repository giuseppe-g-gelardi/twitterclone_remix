import type { SyntheticEvent } from "react";
import { useEffect, useState } from "react";

import type { ActionFunction, UploadHandler } from "@remix-run/node";
import {
  json,
  unstable_parseMultipartFormData as parseMultipartFormData,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import type { Area, Point } from 'react-easy-crop'
import Cropper from 'react-easy-crop'

import { uploadImage } from "~/routes/api/utils.server"
import { uploadProfileImage } from "../api/user.server";
import getCroppedImg from '~/components/utils/getCroppedImg'

// import Icons from "../../components/Icons";

type ActionData = {
  errorMsg?: string;
  imgSrc?: string;
  imgDesc?: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "profile_img") return null;

      const uploadedImage: any = await uploadImage(data)
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );

  const formData = await parseMultipartFormData(request, uploadHandler);
  const imgSrc = formData.get("profile_img");

  const src = imgSrc?.toString()

  if (!imgSrc) return json({ error: "something wrong" })
  return json({ imgSrc }, await uploadProfileImage(params.username, src))
};

export default function UploadBannerImage() {
  const data = useActionData<ActionData>();
  const [file, setFile] = useState<File | null>(null)
  const [fileToCrop, setFileToCrop] = useState<string>('')
  const [crop, setCrop] = useState<Point>({ x: 2, y: 2 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null)
  const [imageToUpload, setImageToUpload] = useState<string>()
  const [previewImage, setPreviewImage] = useState<string>()

  useEffect(() => {
    if (!croppedImage) return;
    let cropped: Blob | string = URL.createObjectURL(croppedImage)
    setPreviewImage(cropped)

    const convertCropped = () => {
      const reader = new FileReader()
      reader.readAsDataURL(croppedImage)
      reader.onloadend = () => {
        setImageToUpload(reader.result as string)
      }
      reader.onerror = () => {
        console.error('error')
      }
    }
    convertCropped()

  }, [file, croppedImage])

  const onSelectFile = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    if (!target.files || target.files?.length === 0) {
      setFile(null)
      return
    }
    setFile(target.files[0])
    setFileToCrop(URL.createObjectURL(target.files[0]))
  }

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    setCroppedImage(await getCroppedImg(fileToCrop, croppedAreaPixels as Area))
    setFile(null)
  };

  const cancelImage = () => setFile(null)

  return (
    <div className="text-center mt-56">
      <label htmlFor="img-field"></label>

      
      <input id="img-field" type="file" name="profile_img" accept="image/*" onChange={onSelectFile} />

      {file && (
        <>
          <div className="fixed bg-black top-0 left-0 right-0 bottom-0 z-10 opacity-50"></div>
          <div className="fixed top-0 left-0 right-0 bottom-20 z-20">
            <Cropper
              image={fileToCrop}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape='round'
              showGrid={false}
            />
          </div>
          <div className="fixed bottom-0 w-full h-[100px] z-20 mb-10">
            <div className="place-content-center">
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onInput={(e: any) => {
                  setZoom(e.target.value);
                }}
                className="w-1/2"
              ></input>
            </div>
            <div className="place-content-center mt-12 mb-10">
              <button
                type='button'
                className="bg-rose-400 m-5"
                onClick={() => cancelImage()}
              >
                clear image
              </button>
              <button
                type='button'
                className="bg-purple-800 m-5"
                onClick={onCrop}
              >
                Crop
              </button>
            </div>
          </div>
        </>
      )}

      {croppedAreaPixels && !data?.imgSrc ? (
        <>
          <Form method="post" encType="multipart/form-data">
            <input
              name="profile_img"
              type='hidden'
              value={imageToUpload}
            />
            <img
              src={previewImage}
              alt=''
            />
            <button
              type="submit"
              className="bg-slate-400 m-5"
            >
              upload banner
            </button>
          </Form>
        </>
      ) : null}

      {data?.errorMsg && <h2>{data.errorMsg}</h2>}
      {data?.imgSrc && (
        <>
          <h2>uploaded image</h2>
          <img src={data.imgSrc} alt={'' || "Upload result"} />
        </>
      )}
    </div>
  );
}


      // {/* <label
      //   htmlFor="img-field"
      //   className="inline-block p-[6px 12px] cursor-pointer">
      //   <i className="bg-zinz-600 rounded-full">{Icons.cameraIcon}</i>
      // </label>
      // {/* this input gets the image */}

      // <input 
      //   multiple={false}
      //   id="img-field" 
      //   type="file" 
      //   name="banner_img" 
      //   accept="image/*" 
      //   onChange={onSelectFile} 
      //   className="text-transparent p-5 invisible"
      // /> */}

      
      // {/* <input
      //   multiple={false}
      //   id="img-field"
      //   type="file"
      //   onChange={onSelectFile}
      //   name="banner_img"
      //   accept="image/*"
      //   className="text-transparent p-5 invisible"
      // /> */}
