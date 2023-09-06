'use client'
import { PRODUCTS_PER_PAGE } from '@/constants';
import { useSearchParams } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import qs from 'query-string'
import Link from 'next/link';

type PaginationLinkProps = {
  page?: number | string;
  active?: boolean;
  disabled?: boolean;
} & PropsWithChildren

const PaginationLink = ({page, active, children, disabled}: PaginationLinkProps) => {
  const params = useSearchParams();
  const limit = PRODUCTS_PER_PAGE;
  const skip = page ? (Number(page) - 1) * limit : 0;

  console.log(params?.toString())

  let currentQuery = {}

  if (params) {
    currentQuery = qs.parse(params?.toString())
  }

  const updateQuery = {
    ...currentQuery,
    page: page,
    skip: skip
  }
  console.log(updateQuery)
  
  return (
    <Link href={{ query: updateQuery }}
      className={`p-2 text-2xl ${active ? "font-bold text-orange-500" : 'text-gray-500'}`}
    >{children}</Link>
  )
}

export default PaginationLink