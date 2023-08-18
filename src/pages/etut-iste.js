import React, { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";

import { db, auth } from "../firebase";

const ref = collection(db, "etutTalepleri");

const EtutIste = () => {
  const [konu, setKonu] = useState("");
  const [tarih, setTarih] = useState("");
  const [ogretmen, setOgretmen] = useState("");
  const [ders, setDers] = useState("");
  const [user] = useAuthState(auth);
  const ornekDurum = "Bekleniyor";

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addDoc(ref, {
        ders: ders,
        konu: konu,
        tarih: tarih,
        name: user.displayName,
        durum: ornekDurum,
        id: auth.currentUser.uid,
        ogretmen: ogretmen,
      })
        .then(() => {
          alert("Talep başarıyla iletildi.");
        })
        .catch(() => {
          alert("Başarısız.");
        });
    },
    [ders, konu, tarih, user.displayName, ornekDurum, ogretmen]
  );

  return (
    <div className="min-h-screen bg-gray-100 py-1 flex flex-col justify-center sm:py-12 px-12">
      <div className="py-3">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Etüt İste
        </h2>
        <div className="flex justify-center">
          <div className="mt-2 bg-white overflow-hidden shadow sm:rounded-lg rounded-md h-auto w-96">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="px-4 mt-5 sm:p-6">
                <label
                  htmlFor="ogrAd"
                  className="block text-sm font-medium text-gray-700"
                >
                  Öğretmen Adı
                </label>
                <input
                  type="text"
                  name="ogrAd"
                  id="ogrAd"
                  required
                  value={ogretmen}
                  placeholder="Öğretmen Adı?"
                  onChange={(e) => setOgretmen(e.currentTarget.value)}
                  className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-20 px-4 sm:p-6">
                <label
                  htmlFor="ders"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ders
                </label>
                <input
                  type="text"
                  name="ders"
                  id="ders"
                  required
                  value={ders}
                  placeholder="Hangi Dersten Alacaksınız?"
                  onChange={(e) => setDers(e.currentTarget.value)}
                  className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="px-4 sm:p-6">
                <label
                  htmlFor="konu"
                  className="block text-sm font-medium text-gray-700"
                >
                  Konu
                </label>
                <input
                  type="text"
                  name="konu"
                  id="konu"
                  required
                  value={konu}
                  placeholder="Ne Konuda Alacaksınız?"
                  onChange={(e) => setKonu(e.currentTarget.value)}
                  className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="px-4 py-1 sm:p-6">
                <label
                  htmlFor="tarih"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gün ve Saat
                </label>
                <input
                  type="text"
                  name="tarih"
                  id="tarih"
                  required
                  value={tarih}
                  placeholder="Gün ve Saat"
                  onChange={(e) => setTarih(e.currentTarget.value)}
                  className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="px-2 sm:p-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Etüt İste
                </button>
                <Link
                  to="/"
                  className="mb-4 mt-2 w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Anasayfa
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EtutIste;
