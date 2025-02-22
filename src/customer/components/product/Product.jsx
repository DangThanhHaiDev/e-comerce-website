"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import { mens_kurta } from "../../../Data/menA";
import { filters, sortOptions } from "./fillterData";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Pagination,
  Radio,
  RadioGroup,
  Slide,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../State/Product/Action";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const location = useLocation();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const param = useParams()
  const decodeQueryString = decodeURIComponent(location.search)
  const searchParams = new URLSearchParams(decodeQueryString)
  const colors = searchParams.get("color")
  const sizes = searchParams.get("size")
  const price = searchParams.get("price")
  const discount = searchParams.get("discount")
  const [sort, setSort] = useState(searchParams.get("sort"))
  const pageNumber = searchParams.get("page") || 1
  const stock = searchParams.get("stock")
  const dispatch = useDispatch()
  const products = useSelector(store => store.product.products?.productList)
  const user = useSelector(store => store.auth.user)
  const totalPage = useSelector(store => store.product.products?.totalPages)
  const [page, setPage] = useState(1)
  const [checked, setChecked] = useState(false)
  const lv1 = param.laveOne
  const lv2 = param.laveTwo
  
  
  



  useEffect(() => {
    const [minPrice, maxPrice] = price ? price.split('_').map(Number) : [0, 0]
    const reqData = {
      color: colors,
      sizes,
      category: param.laveThree,
      minPrice: minPrice,
      maxPrice: maxPrice,
      minDiscount: discount || 1,
      sort: sort || 'price_low',
      stock: stock,
      pageNumber,
      pageSize: 6,
      title: "",
      lv1,
      lv2,
    }
    dispatch(findProducts(reqData))
  }, [param.laveThree, colors, sizes, price, discount, sort, pageNumber, stock, sort, dispatch, user,lv1, lv2])

  const hanldeSort = (e) => {
    e.preventDefault()
    if(e.target.getAttribute("data-value")==="Price: Low to High"){
      setSort("price_low");
    }
    else if(e.target.getAttribute("data-value")==="Price: High to Low"){
      setSort("price_high");

    }

  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    setChecked(true)
    const searchParam = new URLSearchParams(location.search)
    searchParam.set("page", newPage)
    const query = searchParam.toString()
    navigate({ search: `${query}` })
  }

  const handleFilter = (sectionId, value) => {
    let seachParam = new URLSearchParams(location.search);
    let filterValue = seachParam.getAll(sectionId);
    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);
      if (filterValue.length === 0) {
        seachParam.delete(sectionId);
      } else {
        seachParam.set(sectionId, filterValue.join(","));
      }
    } else {
      filterValue.push(value);
      seachParam.set(sectionId, filterValue.join(","));
    }
    let query = seachParam.toString();
    navigate({ search: `${query}` });
  };

  const handleRadioFilter = (sectionId, value) => {
    let searchParam = new URLSearchParams(location.search)
    searchParam.set(sectionId, value)
    let query = searchParam.toString()
    navigate({ search: `?${query}` })
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          {section.options.map((option, optionIdx) => (
                            <FormControl key={optionIdx}>
                              {section.id === "color" ? (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    onChange={() =>
                                      handleFilter(section.id, option.value)
                                    }
                                    defaultValue={option.value}
                                    defaultChecked={option.checked}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-md"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ) : (
                                <FormControlLabel
                                  onChange={(e) => handleRadioFilter(section.id, e.target.value)}
                                  value={option.value}
                                  control={<Radio />}
                                  label={option.label}
                                />
                              )}
                            </FormControl>
                          ))}
                        </RadioGroup>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          onClick={e => hanldeSort(e)}
                          data-value={option.name}
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <div className="flex justify-between  opacity-70">
                  <h3 className="text-left text-lg mb-4">Filters</h3>
                  <FilterAltIcon />
                </div>
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          <FormLabel
                            id="demo-radio-buttons-group-label"
                            sx={{ color: "black", fontWeight: "semibold" }}
                          >
                            {section.name}
                          </FormLabel>
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          {section.options.map((option, optionIdx) => (
                            <FormControl key={optionIdx}>
                              {section.id === "color" ? (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    onChange={() =>
                                      handleFilter(section.id, option.value)
                                    }
                                    defaultValue={option.value}
                                    defaultChecked={option.checked}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-md"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ) : (
                                <FormControlLabel
                                  onChange={(e) => handleRadioFilter(section.id, e.target.value)}
                                  value={option.value}
                                  control={<Radio />}
                                  label={option.label}
                                />
                              )}
                            </FormControl>
                          ))}
                        </RadioGroup>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="flex flex-wrap justify-between py-5">
                  {
                    products ?
                      products.map((item, index) => {
                        return <ProductCard product={item} key={index} />;
                      })
                      :
                      ''}
                </div>

                <div className="flex justify-center items-center">

                  <Pagination page={page} count={totalPage} onChange={handleChangePage} color="secondary" />

                </div>

              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
