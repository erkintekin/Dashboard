exports.seed = function (knex) {
  return knex("products")
    .del() // Varsa eski verileri silme
    .then(() => {
      return knex("products").insert([
        {
          id: 1,
          name: "AirPods",
          category: "Elektronik",
          price: 59.99,
          stock: 143,
          description: "Yüksek kaliteli ve ANC'li kulaklık.",
          image_url:
            "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww",
          created_by: 1, // SuperAdmin ID
          sales: 1200,
        },
        {
          id: 2,
          name: "Deri Cüzdan",
          category: "Aksesuar",
          price: 39.99,
          stock: 89,
          description: "Yüksek kaliteli deri cüzdan.",
          image_url:
            "https://deriol.com/wp-content/uploads/2022/10/Slender-deri-cuzdan-modeli.jpg",
          created_by: 1, // SuperAdmin ID
          sales: 800,
        },
        {
          id: 3,
          name: "Akıllı Saat",
          category: "Elektronik",
          price: 199.99,
          stock: 56,
          description: "Yüksek kaliteli akıllı saat.",
          image_url:
            "https://statics.vestel.com.tr/productimages/20292602_r1_1000_1000.jpg",
          created_by: 1, // SuperAdmin ID
          sales: 650,
        },
        {
          id: 4,
          name: "Yoga Matı",
          category: "Fitness",
          price: 29.99,
          stock: 210,
          description: "Yüksek kaliteli yoga matı.",
          image_url:
            "https://cdn3.hipicon.com/images/bd/products/2024/11/22/margami--mantar-yoga-mat-pro--173225961626540.jpg&w=990&h=990",
          created_by: 1, // SuperAdmin ID
          sales: 950,
        },
        {
          id: 5,
          name: "Kahve Makinesi",
          category: "Ev Aletleri",
          price: 79.99,
          stock: 78,
          description: "Yüksek kaliteli yoga matı.",
          image_url:
            "https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-71795577?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320",
          created_by: 1, // SuperAdmin ID
          sales: 720,
        },
      ]);
    });
};
