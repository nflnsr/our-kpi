import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { MutableRefObject, ReactInstance, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation, useParams } from "react-router-dom";
import { getFileNameFromURL } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Inputs = {
  aktual: string;
  keterangan: string;
  rekomendasi: string;
};

export function DashboardTable({
  data,
  total,
  isLoading,
  tableType,
}: {
  data: [
    {
      user: string;
      laporan_id: string;
      klausuls: string[];
      total: string;
      klausulItems: {
        penilaian_id: string;
        title: string;
        target: number;
        aktual: null;
        keterangan: null;
        disetujui: 0;
        rekomendasi?: string;
        image_path: string;
      }[][];
    },
  ];
  total: number;
  isLoading: boolean;
  tableType: "penilaian" | "laporan" | "rekomendasi";
  componentRef?: MutableRefObject<ReactInstance | null>;
}) {
  const { authData } = useAuth();
  const [isiPenilaianAdmin, setIsiPenilaianAdmin] = useState(false);
  const { state } = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const searchParams = useParams();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<{
    penilaian_id: string;
    image_file: File;
  }>({
    penilaian_id: "",
    image_file: new File([], ""),
  });
  const [selectToEdit, setSelectToEdit] = useState<{
    penilaian_id: string;
    title: string;
    aktual?: string;
    keterangan?: string;
  }>({
    penilaian_id: "",
    title: "",
    aktual: "",
    keterangan: "",
  });

  const handleEdit = (data: {
    penilaian_id: string;
    title: string;
    aktual: string;
    keterangan: string;
  }) => {
    setSelectToEdit(data);
  };

  const { register, handleSubmit } = useForm<Inputs>();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      aktual?: string;
      keterangan?: string;
      image_path?: File;
    }) => {
      return await axiosPrivate.post(
        `/penilaians/${selectToEdit.penilaian_id}`,
        { ...data, _method: "PATCH" },
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [`penilaian-${searchParams.bulan}-${state.departement_id}`],
      });
      setSelectToEdit({
        penilaian_id: "",
        title: "",
        aktual: "",
        keterangan: "",
      });
      toast({
        title: "Edit success!",
        className: "bg-white text-green-600 border-green-500 border-2",
        description: "Wait the data to change",
        duration: 5000,
      });
    },
    onError: async (error) => {
      toast({
        title: "Edit failed!",
        className: "bg-white text-red-600 border-red-500 border-2",
        description: error.message,
        duration: 5000,
      });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  const { mutate: mutateRekomendasiAdmin, isPending: isPendingRekomendasi } =
    useMutation({
      mutationFn: async (data: { rekomendasi: string }) => {
        return await axiosPrivate.post(
          `/penilaians/${selectToEdit.penilaian_id}/rekomendasi`,
          { ...data, _method: "PATCH" },
          {
            withCredentials: true,
          },
        );
      },
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: [
            `penilaian-${searchParams.bulan}-${state?.departement_id}`,
          ],
        });
        setSelectToEdit({
          penilaian_id: "",
          title: "",
          aktual: "",
          keterangan: "",
        });
        toast({
          title: "Edit success!",
          className: "bg-white text-green-600 border-green-500 border-2",
          description: "Wait the data to change",
          duration: 5000,
        });
      },
      onError: async (error) => {
        toast({
          title: "Edit failed!",
          className: "bg-white text-red-600 border-red-500 border-2",
          description: error.message,
          duration: 5000,
        });
      },
    });

  const onSubmitRekomendasiAdmin: SubmitHandler<Inputs> = (data) => {
    mutateRekomendasiAdmin(data);
  };

  const { mutate: mutateSetujuiAdmin, isPending: isPendingSetujui } =
    useMutation({
      mutationFn: async (data: { laporan_id: string }) => {
        return await axiosPrivate.post(
          `/laporan/${data.laporan_id}/setuju`,
          { _method: "PATCH", setuju: 1 },
          {
            withCredentials: true,
          },
        );
      },
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: [
            `penilaian-${searchParams.bulan}-${state?.departement_id}`,
          ],
        });
        setSelectToEdit({
          penilaian_id: "",
          title: "",
          aktual: "",
          keterangan: "",
        });
        toast({
          title: "Edit success!",
          className: "bg-white text-green-600 border-green-500 border-2",
          description: "Wait the data to change",
          duration: 5000,
        });
      },
      onError: async (error) => {
        toast({
          title: "Edit failed!",
          className: "bg-white text-red-600 border-red-500 border-2",
          description: error.message,
          duration: 5000,
        });
      },
    });

  useEffect(() => {
    if (selectedFile?.penilaian_id) {
      axiosPrivate
        .post(
          `/penilaians/${selectedFile?.penilaian_id}`,
          {
            image_path: selectedFile?.image_file,
            _method: "PATCH",
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          },
        )
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: [
              `penilaian-${searchParams.bulan}-${state?.departement_id}`,
            ],
          });
        });
    }
    console.log(selectedFile, "selectedFilenya");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // axiosPrivate,
    // queryClient,
    // searchParams.bulan,
    selectedFile,
    // state?.departement_id,
  ]);

  useEffect(() => {
    {
      data?.map((item) =>
        item?.klausulItems.map((itemLagi) =>
          itemLagi.find(
            (item3) =>
              (tableType === "penilaian" &&
                authData.role === "karyawan" &&
                item3?.target &&
                setIsiPenilaianAdmin(true)) ||
              (tableType === "penilaian" &&
                authData.role === "admin" &&
                // item3?.aktual &&
                !item3?.disetujui &&
                setIsiPenilaianAdmin(true)) ||
              (tableType === "laporan" &&
                authData.role === "karyawan" &&
                item3?.disetujui &&
                setIsiPenilaianAdmin(true)) ||
              (tableType === "laporan" &&
                authData.role === "admin" &&
                item3?.disetujui &&
                setIsiPenilaianAdmin(true)) ||
              (tableType === "rekomendasi" &&
                authData.role === "karyawan" &&
                item3?.rekomendasi &&
                setIsiPenilaianAdmin(true)),
          ),
        ),
      );
    }
    // setIsiPenilaianAdmin(false)
  }, [authData.role, data, isiPenilaianAdmin, tableType, total]);

  // let isiPenilaianAdmin = false;

  // console.log(data, "data");

  return (
    <>
      {isLoading && (
        <>
          <div className="relative">
            <p className="absolute pb-2 text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ">
              Loading...
            </p>
            <div className="w-32 h-32 mx-auto border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        </>
      )}
      {!isLoading && (
        <>
          {Array.from({ length: total ? total : 1 }, (_, n) => (
            <React.Fragment key={n}>
              {authData.role === "admin" && (
                <>
                  {data?.[n]?.user ? (
                    <h1 className="text-lg font-semibold text-center">
                      Email User : {data?.[n]?.user}
                    </h1>
                  ) : null}
                </>
              )}
              <div className="relative w-full my-2 overflow-auto border-2 rounded-lg">
                <Table className="rounded-lg">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[350px] text-base font-semibold text-slate-700 ring-1 ring-gray-300">
                        Indikator
                      </TableHead>
                      <TableHead className="w-[75px] text-center text-base font-semibold text-slate-700 ring-1 ring-gray-300">
                        Target
                      </TableHead>
                      <TableHead className="text-base font-semibold text-center text-slate-700 ring-1 ring-gray-300">
                        Aktual
                      </TableHead>
                      <TableHead className="text-base font-semibold text-center text-slate-700 ring-1 ring-gray-300">
                        Keterangan
                      </TableHead>
                      {tableType === "rekomendasi" ||
                        (tableType === "penilaian" &&
                          authData.role === "admin" && (
                            <TableHead className="text-base font-semibold text-center text-slate-700 ring-1 ring-gray-300">
                              Rekomendasi
                            </TableHead>
                          ))}
                      {tableType === "rekomendasi" && (
                        <TableHead className="text-base font-semibold text-center text-slate-700 ring-1 ring-gray-300">
                          Rekomendasi
                        </TableHead>
                      )}
                      <TableHead className="text-base font-semibold text-center text-slate-700 ring-1 ring-gray-300">
                        Gambar
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 12 }, (_, i) => (
                      <React.Fragment key={i}>
                        {tableType === "penilaian" &&
                          authData.role === "karyawan" &&
                          data?.length > 0 && (
                            <TableRow
                              key={i}
                              className="bg-gray-200 hover:bg-gray-200"
                            >
                              <TableCell
                                colSpan={6}
                                className="px-2 py-2 font-bold text-center sm:py-1 sm:text-left"
                              >
                                {data?.[n]?.klausuls[i]}
                              </TableCell>
                            </TableRow>
                          )}

                        {data?.[n]?.klausulItems[i].find(
                          (item) =>
                            tableType === "penilaian" &&
                            authData.role === "admin" &&
                            // item?.aktual &&
                            !item?.disetujui,
                        ) && (
                          <TableRow
                            key={i}
                            className="bg-gray-200 hover:bg-gray-200"
                          >
                            <TableCell
                              colSpan={6}
                              className="px-2 py-2 font-bold text-center sm:py-1 sm:text-left"
                            >
                              {data?.[n]?.klausuls[i]}
                            </TableCell>
                          </TableRow>
                        )}

                        {/* {data?.[n]?.klausulItems[i].map((item) => {
                          const apaAja =
                            tableType === "penilaian" &&
                            authData.role === "admin" &&
                            item?.aktual;

                          if (apaAja) {
                            // setIsiPenilaianAdmin(true);
                            return (
                              <>
                                <TableRow
                                  key={i}
                                  className="bg-gray-200 hover:bg-gray-200"
                                >
                                  <TableCell
                                    colSpan={6}
                                    className="px-2 py-2 font-bold text-center sm:py-1 sm:text-left"
                                  >
                                    {data?.[n]?.klausuls[i]}
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          }
                        })} */}

                        {data?.[n]?.klausulItems[i].find(
                          (item) => item?.disetujui && tableType === "laporan",
                        ) && (
                          <TableRow
                            key={i}
                            className="bg-gray-200 hover:bg-gray-200"
                          >
                            <TableCell
                              colSpan={6}
                              className="px-2 py-2 font-bold text-center sm:py-1 sm:text-left"
                            >
                              {data?.[n]?.klausuls[i]}
                            </TableCell>
                          </TableRow>
                        )}

                        {data?.[n]?.klausulItems[i].find(
                          (item) =>
                            !item?.disetujui &&
                            tableType === "rekomendasi" &&
                            item?.rekomendasi,
                        ) && (
                          <TableRow
                            key={i}
                            className="bg-gray-200 hover:bg-gray-200"
                          >
                            <TableCell
                              colSpan={6}
                              className="px-2 py-2 font-bold text-center sm:py-1 sm:text-left"
                            >
                              {data?.[n]?.klausuls[i]}
                            </TableCell>
                          </TableRow>
                        )}

                        {data?.[n]?.klausulItems[i]?.map((item, i) => {
                          const itemTitle = item?.title?.split(/(?=\d\.)/);

                          return (
                            <React.Fragment key={i}>
                              {tableType === "penilaian" &&
                                authData.role === "karyawan" && (
                                  <TableRow className="py-0 h-fit bg-gray-50 hover:bg-gray-100">
                                    <Dialog>
                                      <TableCell className="ring-1 ring-slate-300">
                                        {itemTitle?.map((title, j) => (
                                          <p
                                            key={j}
                                            className={`h-full py-0 ${j > 0 && "pl-2"}`}
                                          >
                                            <DialogTrigger
                                              className="w-full p-2 text-left"
                                              onClick={() => {
                                                handleEdit({
                                                  penilaian_id:
                                                    item.penilaian_id,
                                                  title: title as string,
                                                  aktual: String(item?.aktual),
                                                  keterangan: String(
                                                    item?.keterangan
                                                      ? item?.keterangan
                                                      : "",
                                                  ),
                                                  // image_path: item.image_path,
                                                });
                                              }}
                                            >
                                              {title}
                                            </DialogTrigger>
                                          </p>
                                        ))}
                                      </TableCell>
                                      <TableCell className="px-0 text-center ring-1 ring-slate-300">
                                        <DialogTrigger
                                          className="w-full px-2 py-3.5"
                                          onClick={() => {
                                            handleEdit({
                                              penilaian_id: item.penilaian_id,
                                              title: itemTitle[i] as string,
                                              aktual: String(item?.aktual),
                                              keterangan: String(
                                                item?.keterangan
                                                  ? item?.keterangan
                                                  : "",
                                              ),
                                              // image_path: item.image_path,
                                            });
                                          }}
                                        >
                                          {item?.target}
                                        </DialogTrigger>
                                      </TableCell>
                                      <TableCell className="ring-1 ring-slate-300">
                                        <DialogTrigger
                                          className={`w-full break-words px-2 py-3.5 text-center ${Number(item?.aktual) < item?.target ? "text-red-500" : "text-black"}`}
                                          onClick={() => {
                                            handleEdit({
                                              penilaian_id: item.penilaian_id,
                                              title: itemTitle[i] as string,
                                              aktual: String(item?.aktual),
                                              keterangan: String(
                                                item?.keterangan
                                                  ? item?.keterangan
                                                  : "",
                                              ),
                                              // image_path: item.image_path,
                                            });
                                          }}
                                        >
                                          {item?.aktual}
                                        </DialogTrigger>
                                      </TableCell>
                                      <TableCell className="ring-1 ring-slate-300">
                                        <DialogTrigger
                                          className="h-full w-full break-words px-2 py-3.5 text-left"
                                          onClick={() => {
                                            handleEdit({
                                              penilaian_id: item.penilaian_id,
                                              title: itemTitle[i] as string,
                                              aktual: String(item?.aktual),
                                              keterangan: String(
                                                item?.keterangan
                                                  ? item?.keterangan
                                                  : "",
                                              ),
                                              // image_path: item.image_path,
                                            });
                                          }}
                                        >
                                          {item?.keterangan}
                                        </DialogTrigger>
                                      </TableCell>
                                      <DialogContent>
                                        <>
                                          <DialogHeader>
                                            <DialogTitle>
                                              {selectToEdit.title}
                                            </DialogTitle>
                                            <DialogDescription>
                                              Edit Aktual dan Keterangan
                                              berdasarkan baris yang dipilih.
                                            </DialogDescription>
                                          </DialogHeader>
                                          <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="grid gap-4 py-4"
                                          >
                                            {isPending && (
                                              <>
                                                <div className="relative">
                                                  <p className="absolute pb-2 text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ">
                                                    Loading...
                                                  </p>
                                                  <div className="w-32 h-32 mx-auto border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                                                </div>
                                              </>
                                            )}
                                            {!isPending && (
                                              <>
                                                <div className="flex flex-col items-center grid-cols-4 gap-4 sm:grid">
                                                  <Label
                                                    htmlFor="aktual"
                                                    className="text-right"
                                                  >
                                                    Aktual
                                                  </Label>
                                                  <Input
                                                    id="aktual"
                                                    type="number"
                                                    required
                                                    min={0}
                                                    max={10}
                                                    {...register("aktual")}
                                                    className="col-span-3"
                                                    defaultValue={
                                                      selectToEdit.aktual
                                                    }
                                                  />
                                                </div>
                                                <div className="flex flex-col items-center grid-cols-4 gap-4 sm:grid">
                                                  <Label
                                                    htmlFor="keterangan"
                                                    className="text-right"
                                                  >
                                                    Keterangan
                                                  </Label>
                                                  <Input
                                                    id="keterangan"
                                                    {...register("keterangan")}
                                                    className="col-span-3"
                                                    defaultValue={
                                                      selectToEdit.keterangan
                                                    }
                                                  />
                                                </div>
                                                <div className="pt-2">
                                                  <Button
                                                    type="submit"
                                                    className="w-full"
                                                  >
                                                    Submit
                                                  </Button>
                                                </div>
                                              </>
                                            )}
                                          </form>
                                        </>
                                      </DialogContent>
                                    </Dialog>
                                    <TableCell className="w-[150px] max-w-[150px] ring-1 ring-slate-300">
                                      {/* <input type="file" className="ring-1"  /> */}
                                      {!item.image_path ? (
                                        <>
                                          <label
                                            htmlFor="input-file"
                                            className="flex items-center justify-center text-center cursor-pointer"
                                            onClick={() => {
                                              setSelectedFile({
                                                ...selectedFile,
                                                penilaian_id: item.penilaian_id,
                                              });
                                              console.log(
                                                item.penilaian_id,
                                                "penilaian yg beenerrr",
                                              );
                                            }}
                                          >
                                            <div className="flex items-center justify-center">
                                              <svg
                                                className="w-full h-full text-center text-gray-500 max-w-14 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 40 36"
                                              >
                                                <path
                                                  className="flex items-center justify-center h-full"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  stroke-width="2"
                                                  transform="translate(10, 10)"
                                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                              </svg>
                                            </div>
                                          </label>
                                          <input
                                            id="input-file"
                                            type="file"
                                            className="hidden ring-1"
                                            accept="image/*"
                                            onChange={(e) => {
                                              setSelectedFile({
                                                ...selectedFile,
                                                image_file: e.target
                                                  ?.files?.[0] as File,
                                              });
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <div className="flex">
                                          <Link
                                            target="_blank"
                                            to={item?.image_path}
                                            className="break-words max-w-24"
                                          >
                                            <p className="px-2 line-clamp-2">
                                              {getFileNameFromURL(
                                                item?.image_path,
                                              )}
                                            </p>
                                          </Link>
                                          <label
                                            htmlFor="input-file"
                                            className="flex items-center justify-center text-center cursor-pointer min-w-12"
                                            onClick={() => {
                                              setSelectedFile({
                                                ...selectedFile,
                                                penilaian_id: item.penilaian_id,
                                              });
                                              console.log(
                                                item.penilaian_id,
                                                "penilaian yg beenerrr",
                                              );
                                            }}
                                          >
                                            <div className="flex items-center justify-center">
                                              <svg
                                                className="w-full h-full text-center text-gray-500 max-w-14 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 40 36"
                                              >
                                                <path
                                                  className="flex items-center justify-center h-full"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  stroke-width="2"
                                                  transform="translate(10, 10)"
                                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                              </svg>
                                            </div>
                                          </label>
                                          <input
                                            id="input-file"
                                            type="file"
                                            className="hidden ring-1"
                                            accept="image/*"
                                            onChange={(e) => {
                                              setSelectedFile({
                                                ...selectedFile,
                                                image_file: e.target
                                                  ?.files?.[0] as File,
                                              });
                                            }}
                                          />
                                        </div>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                )}
                              {tableType === "penilaian" &&
                                authData.role === "admin" &&
                                // item?.aktual &&
                                !item?.disetujui && (
                                  <TableRow className="py-0 h-fit bg-gray-50 hover:bg-gray-100">
                                    <Dialog>
                                      <TableCell className="ring-1 ring-slate-300">
                                        {itemTitle?.map((title, j) => (
                                          <p
                                            key={j}
                                            className={`h-full py-0 ${j > 0 && "pl-2"}`}
                                          >
                                            <DialogTrigger
                                              className="w-full p-2 text-left"
                                              onClick={() => {
                                                handleEdit({
                                                  penilaian_id:
                                                    item.penilaian_id,
                                                  title: title as string,
                                                  aktual: String(item?.aktual),
                                                  keterangan: String(
                                                    item?.keterangan,
                                                  ),
                                                });
                                              }}
                                            >
                                              {title}
                                            </DialogTrigger>
                                          </p>
                                        ))}
                                      </TableCell>
                                      <TableCell className="px-0 text-center ring-1 ring-slate-300">
                                        <DialogTrigger
                                          className="w-full px-2 py-3.5"
                                          onClick={() => {
                                            handleEdit({
                                              penilaian_id: item.penilaian_id,
                                              title: itemTitle[i] as string,
                                              aktual: String(item?.aktual),
                                              keterangan: String(
                                                item?.keterangan,
                                              ),
                                            });
                                          }}
                                        >
                                          {item?.target}
                                        </DialogTrigger>
                                      </TableCell>
                                      <TableCell className="ring-1 ring-slate-300">
                                        <DialogTrigger
                                          className="w-full break-words px-2 py-3.5 text-center"
                                          onClick={() => {
                                            handleEdit({
                                              penilaian_id: item.penilaian_id,
                                              title: itemTitle[i] as string,
                                              aktual: String(item?.aktual),
                                              keterangan: String(
                                                item?.keterangan,
                                              ),
                                            });
                                          }}
                                        >
                                          {item?.aktual}
                                        </DialogTrigger>
                                      </TableCell>
                                      <TableCell className="ring-1 ring-slate-300">
                                        <DialogTrigger
                                          className="h-full w-full break-words px-2 py-3.5 text-left"
                                          onClick={() => {
                                            handleEdit({
                                              penilaian_id: item.penilaian_id,
                                              title: itemTitle[i] as string,
                                              aktual: String(item?.aktual),
                                              keterangan: String(
                                                item?.keterangan,
                                              ),
                                            });
                                          }}
                                        >
                                          {item?.keterangan}
                                        </DialogTrigger>
                                      </TableCell>
                                      <TableCell className="ring-1 ring-slate-300">
                                        <DialogTrigger
                                          className="h-full w-full break-words px-2 py-3.5 text-left"
                                          onClick={() => {
                                            handleEdit({
                                              penilaian_id: item.penilaian_id,
                                              title: itemTitle[i] as string,
                                              aktual: String(item?.aktual),
                                              keterangan: String(
                                                item?.keterangan,
                                              ),
                                            });
                                          }}
                                        >
                                          {item?.rekomendasi}
                                        </DialogTrigger>
                                      </TableCell>
                                      <DialogContent>
                                        <>
                                          <DialogHeader>
                                            <DialogTitle>
                                              {selectToEdit.title}
                                            </DialogTitle>
                                            <DialogDescription>
                                              Edit Aktual dan Keterangan
                                              berdasarkan baris yang dipilih.
                                            </DialogDescription>
                                          </DialogHeader>
                                          <form
                                            onSubmit={handleSubmit(
                                              onSubmitRekomendasiAdmin,
                                            )}
                                            className="grid gap-4 py-4"
                                          >
                                            {(isPendingRekomendasi ||
                                              isPendingSetujui) && (
                                              <>
                                                <div className="relative">
                                                  <p className="absolute pb-2 text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ">
                                                    Loading...
                                                  </p>
                                                  <div className="w-32 h-32 mx-auto border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                                                </div>
                                              </>
                                            )}
                                            {!(
                                              isPendingRekomendasi ||
                                              isPendingSetujui
                                            ) && (
                                              <>
                                                {/* <div className="flex flex-col items-center grid-cols-4 gap-4 sm:grid">
                                                  <Button className="w-full">
                                                    Setujui
                                                  </Button>
                                                </div> */}
                                                {/* <div className="pt-2">
                                                  <Button
                                                    type="button"
                                                    className="w-full bg-green-500 hover:bg-green-400"
                                                    onClick={() =>
                                                      mutateSetujuiAdmin()
                                                    }
                                                  >
                                                    Setujui
                                                  </Button>
                                                </div> */}
                                                <div className="flex flex-col items-center grid-cols-4 gap-4 sm:grid">
                                                  <Label
                                                    htmlFor="rekomendasi"
                                                    className="text-right"
                                                  >
                                                    Rekomendasi
                                                  </Label>
                                                  <Input
                                                    id="rekomendasi"
                                                    {...register("rekomendasi")}
                                                    className="col-span-3"
                                                  />
                                                </div>
                                                <div className="pt-2">
                                                  <Button
                                                    type="submit"
                                                    className="w-full"
                                                  >
                                                    Submit
                                                  </Button>
                                                </div>
                                              </>
                                            )}
                                          </form>
                                        </>
                                      </DialogContent>
                                    </Dialog>
                                    <Link
                                      target="_blank"
                                      to={item.image_path}
                                      className="max-w-full break-words line-clamp-2"
                                    >
                                      <p className="px-2">
                                        {getFileNameFromURL(item.image_path)}
                                      </p>
                                    </Link>
                                  </TableRow>
                                )}
                              {tableType === "laporan" &&
                              authData.role === "admin" &&
                              item?.disetujui ? (
                                <TableRow className="py-0 h-fit bg-gray-50 hover:bg-gray-100">
                                  <TableCell className="w-full px-2 py-3.5 ring-1 ring-slate-300">
                                    {itemTitle?.map((title, j) => (
                                      <p
                                        key={j}
                                        className={`h-full py-0 ${j > 0 && "pl-2"}`}
                                      >
                                        {title}
                                      </p>
                                    ))}
                                  </TableCell>
                                  <TableCell className="w-full px-0 py-3.5 text-center ring-1 ring-slate-300">
                                    {item?.target}
                                  </TableCell>
                                  <TableCell className="w-full px-2 py-3.5 text-center ring-1 ring-slate-300">
                                    {item?.aktual}
                                  </TableCell>
                                  <TableCell className="w-full px-2 py-3.5 ring-1 ring-slate-300">
                                    {item?.keterangan}
                                  </TableCell>
                                  <Link
                                    target="_blank"
                                    to={item.image_path}
                                    className="max-w-full break-words line-clamp-2"
                                  >
                                    <p className="px-2">
                                      {getFileNameFromURL(item.image_path)}
                                    </p>
                                  </Link>
                                </TableRow>
                              ) : null}
                              {tableType === "laporan" &&
                              authData.role === "karyawan" &&
                              item?.disetujui ? (
                                <TableRow className="py-0 h-fit bg-gray-50 hover:bg-gray-100">
                                  <Dialog>
                                    <TableCell className="w-full px-2 py-3.5 ring-1 ring-slate-300">
                                      {itemTitle?.map((title, j) => (
                                        <p
                                          key={j}
                                          className={`h-full py-0 ${j > 0 && "pl-2"}`}
                                        >
                                          {title}
                                        </p>
                                      ))}
                                    </TableCell>
                                    <TableCell className="w-full px-0 py-3.5 text-center ring-1 ring-slate-300">
                                      {item?.target}
                                    </TableCell>
                                    <TableCell className="w-full px-2 py-3.5 text-center ring-1 ring-slate-300">
                                      {item?.aktual}
                                    </TableCell>
                                    <TableCell className="w-full px-2 py-3.5 ring-1 ring-slate-300">
                                      {item?.keterangan}
                                    </TableCell>
                                    <DialogContent>
                                      <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="grid gap-4 py-4"
                                      >
                                        {isPending && (
                                          <>
                                            <div className="relative">
                                              <p className="absolute pb-2 text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ">
                                                Loading...
                                              </p>
                                              <div className="w-32 h-32 mx-auto border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                                            </div>
                                          </>
                                        )}
                                        {!isPending && (
                                          <>
                                            <div className="flex flex-col items-center grid-cols-4 gap-4 sm:grid">
                                              <Label
                                                htmlFor="aktual"
                                                className="text-right"
                                              >
                                                Aktual
                                              </Label>
                                              <Input
                                                id="aktual"
                                                required
                                                min={0}
                                                max={10}
                                                {...register("aktual")}
                                                className="col-span-3"
                                              />
                                            </div>
                                            <div className="flex flex-col items-center grid-cols-4 gap-4 sm:grid">
                                              <Label
                                                htmlFor="keterangan"
                                                className="text-right"
                                              >
                                                Keterangan
                                              </Label>
                                              <Input
                                                id="keterangan"
                                                {...register("keterangan")}
                                                className="col-span-3"
                                              />
                                            </div>
                                            <div className="pt-2">
                                              <Button
                                                type="submit"
                                                className="w-full"
                                              >
                                                Submit
                                              </Button>
                                            </div>
                                          </>
                                        )}
                                      </form>
                                    </DialogContent>
                                  </Dialog>
                                  <Link
                                    target="_blank"
                                    to={item.image_path}
                                    className="max-w-full break-words line-clamp-2"
                                  >
                                    <p className="px-2">
                                      {getFileNameFromURL(item.image_path)}
                                    </p>
                                  </Link>
                                </TableRow>
                              ) : null}
                              {tableType === "rekomendasi" &&
                              !item?.disetujui &&
                              item?.rekomendasi ? (
                                <TableRow className="py-0 h-fit bg-gray-50 hover:bg-gray-100">
                                  <Dialog>
                                    <TableCell className="h-full px-2 text-left break-words ring-1 ring-slate-300">
                                      {itemTitle?.map((title, j) => (
                                        <p
                                          key={j}
                                          className={`h-full py-0 ${j > 0 && "pl-2"}`}
                                        >
                                          <DialogTrigger
                                            className="w-full p-2 text-left"
                                            onClick={() => {
                                              handleEdit({
                                                penilaian_id: item.penilaian_id,
                                                title: title as string,
                                                aktual: String(item?.aktual),
                                                keterangan: String(
                                                  item?.keterangan
                                                    ? item?.keterangan
                                                    : "",
                                                ),
                                                // image_path: item.image_path,
                                              });
                                            }}
                                          >
                                            {title}
                                          </DialogTrigger>
                                        </p>
                                      ))}
                                    </TableCell>
                                    <TableCell className="h-full px-0 text-center break-words ring-1 ring-slate-300">
                                      <DialogTrigger
                                        className="w-full px-2 py-3.5"
                                        onClick={() => {
                                          handleEdit({
                                            penilaian_id: item.penilaian_id,
                                            title: itemTitle[i] as string,
                                            aktual: String(item?.aktual),
                                            keterangan: String(
                                              item?.keterangan
                                                ? item?.keterangan
                                                : "",
                                            ),
                                            // image_path: item.image_path,
                                          });
                                        }}
                                      >
                                        {item?.target}
                                      </DialogTrigger>
                                    </TableCell>
                                    <TableCell className="h-full px-2 text-center break-words ring-1 ring-slate-300">
                                      <DialogTrigger
                                        className="w-full break-words px-2 py-3.5 text-center"
                                        onClick={() => {
                                          handleEdit({
                                            penilaian_id: item.penilaian_id,
                                            title: itemTitle[i] as string,
                                            aktual: String(item?.aktual),
                                            keterangan: String(
                                              item?.keterangan
                                                ? item?.keterangan
                                                : "",
                                            ),
                                            // image_path: item.image_path,
                                          });
                                        }}
                                      >
                                        {item?.aktual}
                                      </DialogTrigger>
                                    </TableCell>
                                    <TableCell className="h-full px-2 text-left break-words ring-1 ring-slate-300">
                                      <DialogTrigger
                                        className="h-full w-full break-words px-2 py-3.5 text-left"
                                        onClick={() => {
                                          handleEdit({
                                            penilaian_id: item.penilaian_id,
                                            title: itemTitle[i] as string,
                                            aktual: String(item?.aktual),
                                            keterangan: String(
                                              item?.keterangan
                                                ? item?.keterangan
                                                : "",
                                            ),
                                            // image_path: item.image_path,
                                          });
                                        }}
                                      >
                                        {item?.keterangan}
                                      </DialogTrigger>
                                    </TableCell>
                                    <TableCell className="h-full px-2 text-left break-words ring-1 ring-slate-300">
                                      <DialogTrigger
                                        className="h-full w-full break-words px-2 py-3.5 text-left"
                                        onClick={() => {
                                          handleEdit({
                                            penilaian_id: item.penilaian_id,
                                            title: itemTitle[i] as string,
                                            aktual: String(item?.aktual),
                                            keterangan: String(
                                              item?.keterangan
                                                ? item?.keterangan
                                                : "",
                                            ),
                                            // image_path: item.image_path,
                                          });
                                        }}
                                      >
                                        {item?.rekomendasi}
                                      </DialogTrigger>
                                    </TableCell>
                                    <DialogContent>
                                      <>
                                        <DialogHeader>
                                          <DialogTitle>
                                            {selectToEdit.title}
                                          </DialogTitle>
                                          <DialogDescription>
                                            Edit Aktual dan Keterangan
                                            berdasarkan baris yang dipilih.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <form
                                          onSubmit={handleSubmit(onSubmit)}
                                          className="grid gap-4 py-4"
                                        >
                                          {isPending && (
                                            <>
                                              <div className="relative">
                                                <p className="absolute pb-2 text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ">
                                                  Loading...
                                                </p>
                                                <div className="w-32 h-32 mx-auto border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                                              </div>
                                            </>
                                          )}
                                          {!isPending && (
                                            <>
                                              <div className="flex flex-col items-center grid-cols-4 gap-4 sm:grid">
                                                <Label
                                                  htmlFor="aktual"
                                                  className="text-right"
                                                >
                                                  Aktual
                                                </Label>
                                                <Input
                                                  id="aktual"
                                                  type="number"
                                                  required
                                                  min={0}
                                                  max={10}
                                                  {...register("aktual")}
                                                  className="col-span-3"
                                                  defaultValue={
                                                    selectToEdit.aktual
                                                  }
                                                />
                                              </div>
                                              <div className="flex flex-col items-center grid-cols-4 gap-4 sm:grid">
                                                <Label
                                                  htmlFor="keterangan"
                                                  className="text-right"
                                                >
                                                  Keterangan
                                                </Label>
                                                <Input
                                                  id="keterangan"
                                                  {...register("keterangan")}
                                                  className="col-span-3"
                                                  defaultValue={
                                                    selectToEdit.keterangan
                                                  }
                                                />
                                              </div>
                                              <div className="pt-2">
                                                <Button
                                                  type="submit"
                                                  className="w-full"
                                                >
                                                  Submit
                                                </Button>
                                              </div>
                                            </>
                                          )}
                                        </form>
                                      </>
                                    </DialogContent>
                                  </Dialog>
                                  <Link
                                    target="_blank"
                                    to={item.image_path}
                                    className="max-w-full break-words line-clamp-2"
                                  >
                                    <p className="px-2">
                                      {getFileNameFromURL(item.image_path)}
                                    </p>
                                  </Link>
                                </TableRow>
                              ) : null}
                            </React.Fragment>
                          );
                        })}
                        {/* </React.Fragment>
                ))} */}
                      </React.Fragment>
                    ))}
                    {!isiPenilaianAdmin && (
                      <TableRow className="">
                        <TableCell
                          colSpan={6}
                          className="h-20 px-2 text-lg text-center sm:py-1"
                        >
                          {tableType === "penilaian" &&
                          authData.role === "karyawan"
                            ? "Data sudah disetujui Admin"
                            : "Tidak ada data yang tersedia"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {authData.role === "karyawan" && tableType === "laporan" && (
                <TableRow className="flex justify-between px-2 py-1 border-2 rounded-md">
                  <TableCell className="">{data?.[n]?.total && "Total"}</TableCell>
                  <TableCell className="">{data?.[n]?.total}</TableCell>
                </TableRow>
              )}
              {authData.role === "admin" &&
                tableType === "penilaian" &&
                data?.[n]?.user && (
                  <Button
                    type="button"
                    disabled={isPendingSetujui}
                    className="w-full bg-green-500 hover:bg-green-400 disabled:bg-opacity-65"
                    onClick={() =>
                      mutateSetujuiAdmin({ laporan_id: data?.[n]?.laporan_id })
                    }
                  >
                    Setujui
                  </Button>
                )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
}
