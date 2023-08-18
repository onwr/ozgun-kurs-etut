import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase";

const ref = collection(db, "etutTalepleri");

const EtutTalepleri = () => {
  const [users, setUsers] = useState([]);
  const id = auth.currentUser.uid;

  const getId = async () => {
    const q = query(ref, where("id", "==", id));
    const data = await getDocs(q);
    setUsers(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  getId();

  console.log();
  const handleDelete = async (id, durum) => {
    if (durum !== "Onaylandı") {
      await deleteDoc(doc(db, "etutTalepleri", id));
      alert("Talep Silindi.");
    } else {
      alert("Onaylanan Talebi Silemezsiniz.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="py-3">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Taleplerim
        </h2>
        <div>
          <div>
            {users.length === 0 ? (
              <>
                <div className=" bg-red-100 m-12 rounded-md ">
                  <p className="text-gray-600 text-2xl font-semibold text-center py-4">
                    Gösterilecek Talep Bulunamadı.
                  </p>
                  <Link
                    to="/"
                    className="flex justify-center py-2 border border-transparent text-lg  font-medium rounded-b-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Anasayfaya Dön
                  </Link>
                </div>
              </>
            ) : (
              <ol>
                {users.map((etut, sayi) => (
                  <li
                    className="p-4 bg-white rounded-md m-5 font-medium"
                    key={sayi}
                  >
                    <p>Öğretmen {etut.ogretmen}</p>
                    <p>Ders: {etut.ders}</p>
                    <p>Konu: {etut.konu}</p>
                    <p>Gün ve Saat: {etut.tarih}</p>
                    <h2>Durum: {etut.durum}</h2>
                    <button
                      onClick={() => handleDelete(etut.id, etut.durum)}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sil
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
        <div className="mt-8 bg-white overflow-hidden shadow sm:rounded-lg"></div>
      </div>
    </div>
  );
};

export default EtutTalepleri;
