"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/ImageUpload";
import CategoryInput from '@/app/components/categories/CategoryInput';
import { categories } from '@/app/components/categories/categories';
import Input from "@/app/components/input";
import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { FieldValues, Form, SubmitHandler, useForm } from "react-hook-form";

const ProductUploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      latitude: 33.5563,
      longitude: 126.79581,
      imageSrc: "",
      price: 1,
    },
  });

  const imageSrc = watch("imageSrc");
  const category = watch("category");

  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const KakaoMap = dynamic(() => import('../../components/KakaoMap'), {
    ssr: false,
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {};

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  };
  

  return (
    <Container>
      <div
        className="
        max-w-screen-lg mx-auto
      "
      >
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <Heading title="Product Upload" subtitle="upload your product" />
          <ImageUpload value={imageSrc} onChange={(value) => setCustomValue("imageSrc", value)} />
          <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
          <hr />
          <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
          <hr />
          <Input id="price" label="Price" formatPrice disabled={isLoading} register={register} errors={errors} required />
          <hr />

          <div
            className="
        grid
        grid-clos-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
        "
          >
            {categories.map((item) => (
              <div key={item.label} className='col-span-1'>
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.path}
                  label={item.label}
                  icon={item.icon}
                  path={item.path}
                />
              </div>
            ))}
          </div>
          <hr />

          {/* KakaoMap */}
          <KakaoMap setCustomValue={setCustomValue} latitude={latitude} longitude={longitude}/>
          <Button label="상품 생성하기" />
        </form>
      </div>
    </Container>
  );
};

export default ProductUploadPage;
