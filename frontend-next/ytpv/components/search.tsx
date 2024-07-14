"use client";

import { Input } from "@/components/ui/input";
import { SearchResult } from "@/components/search-result";

import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import axios from "axios";

interface SearchProps {
  onAddResult: (id: string, title: string) => void;
}

function Search({ onAddResult }: SearchProps) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([] as any[]);

  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      // Execute your desired action here
      console.log("Input value (debounced):", value);
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ytQuery`, {
          params: {
            query: value,
          },
        })
        .then((res) => {
          console.log("Search results:", res.data);
          setSearchResults(res.data);
        });
    }, 300), // Adjust the debounce delay as needed
    []
  );

  const handleSearch = (s: string) => {
    console.log("Input value:", s);
    setSearchValue(s);
    if (s !== "") {
      debouncedChangeHandler(s);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        value={searchValue}
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="flex flex-col gap-2">
        {searchResults.map((result) => (
          <SearchResult
            key={result.id.videoId}
            id={result.id.videoId}
            title={result.snippet.title}
            channel={result.snippet.channelTitle}
            thumbnailUrl={result.snippet.thumbnails.default.url}
            onAddResult={onAddResult}
          />
        ))}
      </div>
    </div>
  );
}

export { Search };
