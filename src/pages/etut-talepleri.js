import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const ref = collection(db, "etutTalepleri");

const EtutTalepleri = () => {
  const [users, setUsers] = useState([]);
  const [numara, setNumara] = useState("");

  const guvenlikNo = "test";

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "etutTalepleri", id));
    alert("Talep Silindi.");
  };

  const handleUpdate = async (id) => {
    await updateDoc(doc(db, "etutTalepleri", id), {
      durum: "Onaylandı",
    });
  };

  const getId = async () => {
    const data = await getDocs(ref);
    setUsers(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const guvenlik = (numara) => {
    if (numara !== guvenlikNo) {
      alert("Geçersiz Numara");
    } else {
      alert("Başarılı, Yönlendiriliyorsunuz.");
    }
  };

  getId();

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="py-3">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Etüt Talepleri
        </h2>
        <div>
          {numara !== guvenlikNo ? (
            <>
              <h2 className="text-center text-3xl font-bold text-gray-900">
                Sayfasına Erişebilmek İçin Şifre <br /> Girmeniz Gerekiyor.
              </h2>
              <div className="flex flex-row justify-center mt-4">
                <input
                  type="text"
                  placeholder="Şifre"
                  value={numara}
                  onChange={(e) => setNumara(e.target.value)}
                  className="border p-2 mb-2"
                />
                <button
                  onClick={() => guvenlik(numara)}
                  className="ml-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Giriş
                </button>
              </div>
            </>
          ) : (
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
                      Anasayfa
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
                      <p>Talep Eden Öğrenci: {etut.name}</p>
                      <p className="mt-2">Öğretmen: {etut.ogretmen}</p>
                      <p className="mt-2">Ders: {etut.ders}</p>
                      <p className="mt-2">Konu: {etut.konu}</p>
                      <p className="mt-2">Gün ve Saat: {etut.tarih}</p>
                      <p className="mb-2 mt-2">Durum: {etut.durum}</p>
                      <button
                        onClick={() => handleDelete(etut.id)}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Sil
                      </button>
                      <button
                        onClick={() => handleUpdate(etut.id)}
                        className=" mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Onayla
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </div>
        <div className="mt-8 bg-white overflow-hidden shadow sm:rounded-lg"></div>
      </div>
    </div>
  );
};

export default EtutTalepleri;
