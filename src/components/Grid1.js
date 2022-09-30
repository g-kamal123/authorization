import {
  Button,
  Card,
  DataTable,
  Page,
  Pagination,
  Select,
  Frame,
  Loading,
  TextField,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
function Grid1() {
  const [selected, setSelected] = useState([
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
  ]);
  const [allvalues, setAllvalues] = useState(["", "", "", "", "", "", "", ""]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState("5");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (index, value) => {
    // console.log(value)
    let arr = [...selected];
    arr[index] = value;
    setSelected(arr);
    // getUsersonConstraint(page, count, allvalues);
  };
  const countChange = (value) => {
    // getUsersonConstraint(page, count, allvalues);
    setCount(value);
  };
  // console.log(page);
  // console.log(count);
  const options = [
    { label: "Equals", value: "1" },
    { label: "Not Equals", value: "2" },
    { label: "Contains", value: "3" },
    { label: "Does Not Contains", value: "4" },
    { label: "Starts With", value: "5" },
    { label: "Ends With", value: "6" },
  ];
  const getUsersonConstraint = async (p, c, arr) => {
    let url = `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${p}&count=${Number(
      c
    )}`;
    const allIndex = [
      "user_id",
      "catalog",
      "username",
      "shops.email",
      "shopify_plan",
      "updated_at",
      "created_at",
      "shop_url",
    ];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== "")
        url += `&filter[${allIndex[i]}][${selected[i]}]=${arr[i]}`;
    }
    console.log(url);
    getUsers(url);
  };
  const inputSearch = (index, constraint, inpValue) => {
    let arr = [...allvalues];
    arr[index] = inpValue;
    setAllvalues([...arr]);
    // getUsersonConstraint(page, count, arr);
  };

  const placeholders = [
    "user_id",
    "catalog",
    "username",
    "email",
    "shopify_plan",
    "updated_at",
    "create_at",
    "shop_url",
  ];

  const rows1 = Array(8)
    .fill("")
    .map((item, i) => (
      <>
        <Select
          options={options}
          onChange={(value) => handleSelectChange(i, value)}
          value={selected[i]}
        />
        <TextField
          value={allvalues[i]}
          onChange={(value) => inputSearch(i, selected[i], value)}
          placeholder={placeholders[i]}
        />
      </>
    ));

  const [row, setrow] = useState([]);
  const getUsers = async (url) => {
    setLoading(true);
    const ftch = await fetch(url, {
      headers: {
        Authorization: sessionStorage.getItem("k"),
      },
    });
    const dt = await ftch.json();
    let arr = dt.data.rows.map((item) => [
      item.user_id,
      item.catalog,
      item.username,
      item.email,
      item.shopify_plan,
      item.updated_at,
      item.created_at,
      item.shop_url,
    ]);
    // console.log(arr);
    // console.log(dt.data.rows);
    localStorage.setItem("data", dt.data.rows);
    setTotal(dt.data.count);
    setrow([...arr]);
    console.log(dt.data.rows);
    setLoading(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      getUsersonConstraint(page, count, allvalues);
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [page,count,allvalues]);

  return (
    <Page title="Data Grid...">
      {row.length > 0 && (
        <p style={{ fontSize: "1.4rem", fontWeight: "800" }}>
          Showing from {(page - 1) * Number(count) + 1} to {(page * Number(count))>total?total:page*Number(count)} of {total} users
        </p>
      )}
      {row.length === 0 && <p style={{ fontSize: "1.4rem", fontWeight: "800" }}>{loading?"Searching.....":"NO Data Found"}</p>}
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "2rem",
          }}
        >
          <Pagination
            label={page}
            hasPrevious={page > 1}
            onPrevious={() => {
              if (page > 1) {
                // getUsersonConstraint(page - 1, count, allvalues);
                setPage(page - 1);
              }
            }}
            hasNext={(page*Number(count)<total)}
            onNext={() => {
              // getUsersonConstraint(page + 1, count, allvalues);
              setPage(page + 1);
            }}
          />
          <Select
            options={[
              { label: "Row per page 5", value: "5" },
              { label: "Row per page 10", value: "10" },
            ]}
            onChange={countChange}
            value={count}
          />
          <Button primary>View Columns</Button>
        </div>
      </Card>
      <Card>
        <DataTable
          columnContentTypes={[
            "numeric",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
          ]}
          headings={[
            "UserId",
            "Catalog",
            "Shop Domain",
            "Shop Email",
            "Shop Plan Name",
            "Updated at",
            "Created at",
            "Shops myshopify domain",
          ]}
          rows={[rows1, ...row]}
        />
        {loading && (
          <div style={{ height: "100px" }}>
            <Frame>
              <Loading />
            </Frame>
          </div>
        )}
      </Card>
    </Page>
  );
}

export default Grid1;
