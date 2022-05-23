import type { SyntheticEvent } from "react";
import { useEffect, useState } from "react";

import { Form, useActionData } from "@remix-run/react";

import type { Area, Point } from 'react-easy-crop'
import Cropper from 'react-easy-crop'

import getCroppedImg from '~/components/utils/getCroppedImg'
// import type { ActionFunction, UploadHandler } from "@remix-run/node";
// import {
//   json,
//   unstable_parseMultipartFormData as parseMultipartFormData,
//   unstable_composeUploadHandlers as composeUploadHandlers,
//   unstable_createMemoryUploadHandler as createMemoryUploadHandler
// } from "@remix-run/node";
// import { uploadImage } from "~/routes/api/utils.server"
// import { uploadProfileBanner } from "~/routes/api/user.server";
// import Icons from "../../components/Icons";

type ActionData = {
  errorMsg?: string;
  imgSrc?: string;
};

// export const action: ActionFunction = async ({ request, params }) => {
//   const uploadHandler: UploadHandler = composeUploadHandlers(
//     async ({ name, data }) => {
//       if (name !== "banner_img") return null;

//       const uploadedImage: any = await uploadImage(data)
//       return uploadedImage.secure_url;
//     },
//     createMemoryUploadHandler()
//   );

//   const formData = await parseMultipartFormData(request, uploadHandler);
//   const imgSrc = formData.get("banner_img");

//   const src = imgSrc?.toString()

//   if (!imgSrc) return json({ error: "something wrong" })
//   return json({ imgSrc }, await uploadProfileBanner(params.username, src))
// };

export default function UploadProfileBanner() {
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

  const cancel = () => {
    setFile(null)
    setFileToCrop('')
    setCroppedImage(null)
    setPreviewImage(undefined)
    setCroppedAreaPixels(undefined)
  }

  return (
    <div className="text-center"> 
    {/* mt-56 */}

{!croppedAreaPixels && !data?.imgSrc ? (
  <>
  <label htmlFor="img-field"></label>
  <input id="img-field" type="file" name="banner_img" accept="image/*" onChange={onSelectFile} />
  </>
) : null}

      {file && (
        <>
          <div className="fixed bg-black top-0 left-0 right-0 bottom-0 z-10 opacity-90 blur-xxl"></div>
          <div className="fixed top-0 left-0 right-0 bottom-20 z-20">
            <Cropper
              image={fileToCrop}
              crop={crop}
              zoom={zoom}
              aspect={3 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
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
              <div className="inline-flex rounded-md shadow-md" role='group'>

              <button
                type='button'
                className="bg-rose-400 font-extrabold text-white active:bg-violet-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border-0 rounded-l-3xl w-auto h-auto p-2.5"
                onClick={() => cancel()}
                >
                clear image
              </button>
              <button
                type='button'
                className="bg-violet-500 font-extrabold text-white active:bg-violet-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border-0 rounded-r-3xl w-auto h-auto p-2.5" 
                onClick={onCrop}
                >
                Crop
              </button>
                </div>
            </div>
          </div>
        </>
      )}

      {croppedAreaPixels && !data?.imgSrc ? (
        <>
            <img
              src={previewImage}
              alt=''
            />
          <Form method="post" encType="multipart/form-data">
            <input
              name="banner_img"
              type='hidden'
              value={imageToUpload}
            />
            <button
                type='button'
                className="bg-rose-400 m-5"
                onClick={() => cancel()}
              >
                cancel crop
              </button>
            <button
              type="submit"
              className="bg-slate-400 m-5"
              name="_action"
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


// {/* <button
// className="bg-violet-500 font-extrabold text-white active:bg-violet-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border-0 rounded-3xl"
// onClick={() => setShowModal(true)}
// >
// {buttonText}
// </button> */}

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
