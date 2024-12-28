
export const filters = [
  // {
  //   id: "color",
  //   name: "Color",
  //   options: [
  //     { value: "white", label: "White", checked: false },
  //     { value: "beige", label: "Beige", checked: false },
  //     { value: "blue", label: "Blue", checked: false },
  //     { value: "brown", label: "Brown", checked: false },
  //     { value: "green", label: "Green", checked: false },
  //     { value: "purple", label: "Purple", checked: false },
  //   ],
  // },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S", checked: false },
      { value: "M", label: "M", checked: false },
      { value: "L", label: "L", checked: true },
      { value: "", label: "All Sizes", checked: true },

    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0_100000", label: "Below 100 000 đ", checked: false },
      { value: "100000_300000", label: "100 000 đ - 300 000 đ", checked: false },
      { value: "300000_500000", label: "300 000 đ - 500 000 đ", checked: false },
      { value: "500000_700000", label: "500 000 đ - 700 000 đ", checked: false },
      { value: "700000_10000000000", label: "Above 1 000 000 đ", checked: false },
      { value: "0_1000000000000000", label: "All Prices", checked: false },

    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    options: [
      { value: "10", label: "10% and above", checked: false },
      { value: "20", label: "20% and above", checked: false },
      { value: "30", label: "30% and above", checked: false },
      { value: "40", label: "40% and above", checked: false },
      { value: "50", label: "50% and above", checked: false },
      { value: "60", label: "60% and above", checked: false },
      { value: "70", label: "70% and above", checked: false },
      { value: "80", label: "80% and above", checked: false },
      { value: "90", label: "90% and above", checked: false },
      { value: "0", label: "All products", checked: false }
    ],
  }
];
export const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
