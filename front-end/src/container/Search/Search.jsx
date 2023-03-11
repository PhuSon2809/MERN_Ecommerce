import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import HeadlessTippy from "@tippyjs/react/headless";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductByKeyword } from "../../actions/productAction";
import { SEARCH_PRODUCT_REQUEST } from "../../constants/productConstants";
import useDebounce from "../../hooks/useDebounce";
import FetureProduct from "../FetureProduct/FetureProduct";
import "./Search.scss";
import { SearchBox, SearchIconWrapper, StyledInputBase } from "./SearchStyle";

function Search() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { productSearch, error } = useSelector((state) => state.productSearch);

  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);

  const debounceValue = useDebounce(searchValue, 500);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (debounceValue !== "") {
      dispatch(getProductByKeyword(debounceValue));
    } else {
      dispatch({ type: SEARCH_PRODUCT_REQUEST });
    }
  }, [dispatch, debounceValue, alert, error]);

  return (
    <Box>
      <HeadlessTippy
        interactive
        placement="bottom"
        appendTo={() => document.body}
        visible={showResult && productSearch?.length > 0}
        render={(attrs) => (
          <div className="search-result" tabIndex="-1" {...attrs}>
            <div className="box-result">
              {productSearch &&
                productSearch?.map((product) => (
                  <FetureProduct key={product._id} product={product} />
                ))}
            </div>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <SearchBox>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "#000" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchValue}
            spellCheck={false}
            onChange={handleChange}
            onFocus={(e) => setShowResult(true)}
          />
        </SearchBox>
      </HeadlessTippy>
    </Box>
  );
}

export default Search;
