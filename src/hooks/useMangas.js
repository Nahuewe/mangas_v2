import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchMangas,
  createManga,
  updateManga,
  deleteManga,
  searchAutores,
  fetchAutores,
  createAutor,
  updateAutor,
  deleteAutor,
  searchDibujantes,
  fetchDibujantes,
  createDibujante,
  updateDibujante,
  deleteDibujante,
} from "../lib/api"

// Hooks para Mangas
export const useMangas = () => {
  return useQuery({
    queryKey: ["mangas"],
    queryFn: fetchMangas,
  })
}

export const useCreateManga = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createManga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangas"] })
    },
  })
}

export const useUpdateManga = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateManga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangas"] })
    },
  })
}

export const useDeleteManga = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteManga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangas"] })
    },
  })
}

// Hooks para Autores
export const useAutores = () => {
  return useQuery({
    queryKey: ["autores"],
    queryFn: fetchAutores,
    staleTime: 10 * 60 * 1000,
  })
}

export const useSearchAutores = (query) => {
  return useQuery({
    queryKey: ["autores", "search", query],
    queryFn: () => searchAutores(query),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateAutor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAutor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["autores"] })
    },
  })
}

export const useUpdateAutor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAutor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["autores"] })
    },
  })
}

export const useDeleteAutor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAutor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["autores"] })
    },
  })
}

// Hooks para Dibujantes
export const useDibujantes = () => {
  return useQuery({
    queryKey: ["dibujantes"],
    queryFn: fetchDibujantes,
    staleTime: 10 * 60 * 1000,
  })
}

export const useSearchDibujantes = (query) => {
  return useQuery({
    queryKey: ["dibujantes", "search", query],
    queryFn: () => searchDibujantes(query),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateDibujante = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createDibujante,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dibujantes"] })
    },
  })
}

export const useUpdateDibujante = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateDibujante,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dibujantes"] })
    },
  })
}

export const useDeleteDibujante = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteDibujante,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dibujantes"] })
    },
  })
}
