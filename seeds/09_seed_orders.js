/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizle
  await knex("orders").del();

  // Yeni verileri ekleme
  await knex("orders").insert([
    {
      order_id: "ORD001",
      customer: "Ahmet Yılmaz",
      total: 235.4,
      status: "Teslim Edildi",
      date: "2023-07-01",
    },
    {
      order_id: "ORD002",
      customer: "Ayşe Kaya",
      total: 412.0,
      status: "İşlemde",
      date: "2023-07-02",
    },
    {
      order_id: "ORD003",
      customer: "Mehmet Demir",
      total: 162.5,
      status: "Kargoya Verildi",
      date: "2023-07-03",
    },
    {
      order_id: "ORD004",
      customer: "Fatma Çelik",
      total: 750.2,
      status: "Beklemede",
      date: "2023-07-04",
    },
    {
      order_id: "ORD005",
      customer: "Ali Şahin",
      total: 95.8,
      status: "Teslim Edildi",
      date: "2023-07-05",
    },
    {
      order_id: "ORD006",
      customer: "Zeynep Koç",
      total: 310.75,
      status: "İşlemde",
      date: "2023-07-06",
    },
    {
      order_id: "ORD007",
      customer: "Hakan Özkan",
      total: 528.9,
      status: "Kargoya Verildi",
      date: "2023-07-07",
    },
    {
      order_id: "ORD008",
      customer: "Elif Aslan",
      total: 189.6,
      status: "Teslim Edildi",
      date: "2023-07-08",
    },
  ]);
};
