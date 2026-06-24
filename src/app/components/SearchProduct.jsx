'use client'
import { Label, SearchField } from "@heroui/react";
import { redirect } from "next/navigation";
import React from "react";

const SearchProduct = () => {
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(e.target.search.value)
        redirect(`/allclasses?search=${e.target.search.value}`)
    } 
  return (
    <div >
        <form onSubmit={onSubmit}>
             <SearchField name="search">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
        </form>
     
    </div>
  );
};

export default SearchProduct;
