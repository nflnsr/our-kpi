import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { MutableRefObject, ReactInstance, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { useToast } from "./ui/use-toast";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useParams } from "react-router-dom";

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
  // componentRef,
}: {
  data: [
    {
      user: string;
      laporan_id: string;
      klausuls: string[];
      klausulItems: {
        penilaian_id: string;
        title: string;
        target: number;
        aktual: null;
        keterangan: null;
        disetujui: 0;
        rekomendasi?: string;
      }[][];
    },
  ];
  total: number;
  isLoading: boolean;
  tableType: "penilaian" | "laporan" | "rekomendasi";
  componentRef?: MutableRefObject<ReactInstance | null>;
  // user: string;
}) {
  console.log(data, "data cari laporan id");
  const { authData } = useAuth();
  const [isiPenilaianAdmin, setIsiPenilaianAdmin] = useState(false);
  const { state } = useLocation();
  console.log(state, "stateee");
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const searchParams = useParams();
  console.log(searchParams, "bulan");
  const { toast } = useToast();
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
    console.log(data);
    setSelectToEdit(data);
  };

  const { register, handleSubmit } = useForm<Inputs>();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { aktual: string; keterangan: string }) => {
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
        queryKey: [`penilaian-${searchParams.bulan}`],
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
                      Email User : ${data?.[n]?.user}
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 12 }, (_, i) => (
                      <React.Fragment key={i}>
                        {tableType === "penilaian" &&
                          authData.role === "karyawan" && (
                            <TableRow
                              key={i}
                              className="bg-gray-200 hover:bg-gray-200"
                            >
                              <TableCell
                                colSpan={4}
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
                              colSpan={5}
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
                                    colSpan={5}
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
                              colSpan={4}
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
                              colSpan={5}
                              className="px-2 py-2 font-bold text-center sm:py-1 sm:text-left"
                            >
                              {data?.[n]?.klausuls[i]}
                            </TableCell>
                          </TableRow>
                        )}

                        {/* {tableType === 'laporan' && data?.[0]?.klausulItems[i]?.map((item) => (
                  
                  <TableRow key={i} className="bg-gray-200 hover:bg-gray-200">
                    <TableCell
                      colSpan={4}
                      className="px-2 py-2 font-bold text-center sm:py-1 sm:text-left"
                      >
                      {data?.[0]?.klausuls[i]}
                    </TableCell>
                  </TableRow>
                    ))} */}
                        {/* {data?.map((datanya, i) => (
<React.Fragment key={i}>   */}

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
                                                item?.keterangan
                                                  ? item?.keterangan
                                                  : "",
                                              ),
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
                                </TableRow>
                              ) : null}
                              {tableType === "rekomendasi" &&
                              !item?.disetujui &&
                              item?.rekomendasi ? (
                                <TableRow className="py-0 h-fit bg-gray-50 hover:bg-gray-100">
                                  <TableCell className="h-full break-words px-2 py-3.5 text-left ring-1 ring-slate-300">
                                    {itemTitle?.map((title, j) => (
                                      <p
                                        key={j}
                                        className={`h-full py-0 ${j > 0 && "pl-2"}`}
                                      >
                                        {title}
                                      </p>
                                    ))}
                                  </TableCell>
                                  <TableCell className="h-full break-words px-0 py-3.5 text-center ring-1 ring-slate-300">
                                    {item?.target}
                                  </TableCell>
                                  <TableCell className="h-full break-words px-2 py-3.5 text-center ring-1 ring-slate-300">
                                    {item?.aktual}
                                  </TableCell>
                                  <TableCell className="h-full break-words px-2 py-3.5 text-left ring-1 ring-slate-300">
                                    {item?.keterangan}
                                  </TableCell>
                                  <TableCell className="h-full break-words px-2 py-3.5 text-left ring-1 ring-slate-300">
                                    {item?.rekomendasi}
                                  </TableCell>
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
                          colSpan={5}
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
