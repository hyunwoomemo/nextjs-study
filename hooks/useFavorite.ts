'use client'

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface UseFavoriteProps {
  productId: string;
  currentUser?: User | null;
}

const useFavorite = ({ productId, currentUser }: UseFavoriteProps) => {
  const router = useRouter()
  console.log(currentUser)

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(productId);
  }, [currentUser, productId])

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    console.log(currentUser, productId)
    if (!currentUser) return;

    try {
      let request;

      console.log(hasFavorite)
      if (hasFavorite) {
        request = () => axios.delete(`/api/favorites/${productId}`)
      } else {
        request = () => axios.post(`/api/favorites/${productId}`)
      }

      await request();
      router.refresh()

    } catch (err) {

    }
  }

  return {
    hasFavorite,
    toggleFavorite
  }
}

export default useFavorite