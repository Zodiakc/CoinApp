import React from "react";
import styles from "./Table.module.scss";
import { useCoinsContext } from "@/app/providers/CoinsContextProvider";
import { useState } from "react";
import Button from "@/app/ui/Button/Button";
import Input from "@/app/ui/Input/Input";
import Link from "next/link";
import Modal from "@/app/ui/Modal/Modal";
import { useProfileContext } from "@/app/providers/ProfileContext";
import DropDown from "@/app/ui/DropDown/DropDown";

const Table: React.FC<any> = ({ isSuccess }) => {
    const { coinsData, page, setPage, setCoinsData, setFilterValue }: any =
        useCoinsContext();
    const { modalState, setModalState, modalInfo, setModalInfo }: any =
        useProfileContext();
    const prevPage = (page: any) => {
        !page ? setPage(0) : setPage(page - 10);
    };
    const nextPage = (page: any) => {
        setPage(page + 10);
    };
    const handleChangeValue = (e: any) => {
        const value = e.target.value;
        setFilterValue(value);
    };

    const addModal = (info: any) => {
        setModalState(!modalState);
        setModalInfo(info);
    };

    return (
        <>
            <Input childFunc={handleChangeValue} />
            <DropDown />
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>marketCapUsd</th>
                        <th>changePercent24Hr</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {isSuccess
                        ? coinsData.map((item: any) => (
                              <tr key={item.id} className={styles.row}>
                                  <Link
                                      href={`/CoinsInfo/${item.id}`}
                                      style={{ display: "contents" }}
                                  >
                                      <td>{item.symbol}</td>
                                      <td>{item.name}</td>
                                      <td>
                                          {item.priceUsd >= 0.001
                                              ? Number(
                                                    item.priceUsd
                                                ).toLocaleString("en-us", {
                                                    style: "currency",
                                                    currency: "USD",
                                                })
                                              : "$0.01"}
                                      </td>
                                      <td>
                                          {Number(
                                              item.marketCapUsd
                                          ).toLocaleString("en-us", {
                                              style: "currency",
                                              currency: "USD",
                                          })}
                                      </td>
                                      <td>
                                          {Number(
                                              item.changePercent24Hr
                                          ).toLocaleString("en-us", {
                                              style: "percent",
                                          })}
                                      </td>
                                  </Link>
                                  <td>
                                      <Button
                                          childname="Add"
                                          childFunc={() =>
                                              addModal({
                                                  id: item.id,
                                                  name: item.name,
                                                  price: Number(
                                                      item.priceUsd
                                                  ).toLocaleString("en-us", {
                                                      style: "currency",
                                                      currency: "USD",
                                                  }),
                                              })
                                          }
                                      />
                                  </td>
                              </tr>
                          ))
                        : console.log("Empty Array")}
                </tbody>
            </table>
            <Modal isClicked={modalState}></Modal>
            <Button childname="Prev" childFunc={prevPage} param={page} />
            <Button childname="Next" childFunc={nextPage} param={page} />
        </>
    );
};

export default Table;
