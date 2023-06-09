import { ChangeEvent, useContext, useRef, useState } from "react"
import { PlacesContext } from "../context";
import { SearchResult } from "./SearchResult";

export const SearchLocation = () => {

  const { searchPlacesByQuery, inputValue, setInputValue } = useContext(PlacesContext);
  const [placeContainer, setPlaceContainer] = useState<boolean>(false);
  // Creacion del debounce
  const debounce = useRef<NodeJS.Timeout>();

  // Esta funcion permite borrrar el valor que contenemos en el timeout del useRef
  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {

    // Verificamos si hay un valor
    if (debounce.current) clearTimeout(debounce.current);

    setInputValue(event.target.value);
  
    debounce.current = setTimeout(() => {
      searchPlacesByQuery(inputValue)
    }, 300);

    setPlaceContainer(true);
  };

  return (
    <section className="search-container">
      <input
        type="text"
        value={inputValue}
        className="form-control"
        onChange={onQueryChanged}
        placeholder="Busque su destino"
      />
      {placeContainer && <SearchResult setPlaceContainer={setPlaceContainer} />}
    </section>
  );
}
