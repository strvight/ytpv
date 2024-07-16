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
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ytQuery`, {
          params: {
            query: value,
          },
        })
        .then((res) => {
          setSearchResults(res.data);
        });
    }, 300),
    []
  );

  const handleSearch = (s: string) => {
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
