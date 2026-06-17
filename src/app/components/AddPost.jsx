"use client";

import {
  FieldError,
  Input,
  Label,
  TextField,
  TextArea,
  Button,
} from "@heroui/react";
import React, { useState, useRef } from "react";
import { imageUpload } from "../lib/imageUpload";

const AddProfile = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    //console.log("Profile data:", data);
    // TODO: send to API

    const image = await imageUpload(data.image);
    // const allInfo = {
    //   ...data,
    //   image: image.url
    // }
    // send to backend
  };

  return (
    <div className="bg-blue-100/30 min-h-screen">
      <form onSubmit={onSubmit} className="p-10 space-y-8 container mx-auto">
        {/* Upload Image */}
        <div className="flex flex-col items-center gap-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-28 h-28 rounded-full border-4 border-dashed border-blue-300 bg-white flex items-center justify-center cursor-pointer overflow-hidden hover:border-blue-500 transition-colors"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16v-8m0 0-3 3m3-3 3 3M4.5 19.5h15a1.5 1.5 0 0 0 1.5-1.5V8.25a1.5 1.5 0 0 0-.879-1.359l-7.5-3a1.5 1.5 0 0 0-1.242 0l-7.5 3A1.5 1.5 0 0 0 3 8.25V18a1.5 1.5 0 0 0 1.5 1.5Z"
                  />
                </svg>
                <span className="text-xs font-medium">Upload</span>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2 transition-colors"
            >
              {previewUrl ? "Change photo" : "Choose photo"}
            </button>
            {previewUrl && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-sm text-red-400 hover:text-red-600 font-medium underline underline-offset-2 transition-colors"
              >
                Remove
              </button>
            )}
          </div>

          {fileName && (
            <p className="text-xs text-gray-400 -mt-2">{fileName}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Name */}
          <div className="md:col-span-2">
            <TextField name="name" isRequired>
              <Label>Name</Label>
              <Input placeholder="Jane Doe" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          {/* Username */}
          <TextField name="username" isRequired>
            <Label>Username</Label>
            <Input placeholder="@janedoe" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField name="email" isRequired>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="jane@example.com"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Website */}
          <TextField name="website">
            <Label>Website</Label>
            <Input
              type="url"
              placeholder="https://yourwebsite.com"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Location */}
          <TextField name="location">
            <Label>Location</Label>
            <Input placeholder="Dhaka, Bangladesh" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Bio */}
          <div className="md:col-span-2">
            <TextField name="bio" isRequired>
              <Label>Bio</Label>
              <TextArea
                placeholder="Tell us a little about yourself..."
                className="rounded-3xl"
                rows={4}
              />
              <FieldError />
            </TextField>
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Save Profile
        </Button>
      </form>
    </div>
  );
};

export default AddProfile;
