import { createElement } from "../utils/createElement";
import { HTMLElementEvent } from "../../types";
import SupportedCryptoPagination from "./supported-crypto-pagination";
import { CryptoData } from "./supported-crypto.types";

type SupportedCryptoSearchProps = {
  nameContainer: string;
  nameSearch: string;
  namePagination: string;
};
class SupportedCryptoSearch extends SupportedCryptoPagination {
  searchElement: HTMLInputElement | null = null;
  clearElement: Element | null = null;
  backupData: null | CryptoData[] = null;
  searchValue: string | null = null;

  nextEvent: number | null = null;

  constructor(props: SupportedCryptoSearchProps) {
    super(props);
    this.backupData = this.cryptos;
    this.searchElement = document.querySelector(
      "[data-name=SupportedCryptoSearchInput]"
    );
    this.clearElement = document.querySelector(
      "[data-name=SupportedCryptoSearchClear]"
    );
  }

  init(): typeof this {
    super.init();
    this.initialSearchInput();
    this.initialSearchClearButton();
    return this;
  }

  render(): void {
    super.render();
  }

  rerender() {
    super.rerender();
  }

  initialSearchClearButton() {
    this.clearElement?.addEventListener("click", () => {
      this.clearSearch();
    });
  }

  clearSearch() {
    if (this.searchElement === null) return;
    if (this.searchElement.value === "") return;
    this.searchValue = null;
    this.searchElement.value = "";
    this.renderData = [...this.cryptos];
    this.rerender();
  }

  initialSearchInput() {
    const debounceEvent = (e: HTMLElementEvent<HTMLInputElement>) => {
      const value = e.currentTarget?.value;
      if (this.nextEvent !== null) clearTimeout(this.nextEvent);

      this.nextEvent = setTimeout(() => {
        this.handleChangeSearch(value);
      }, 300);
    };

    this.searchElement?.addEventListener("input", debounceEvent);
  }

  handleChangeSearch(value?: string) {
    this.searchValue = value ?? null;

    const filterData = this.searchValue
      ? this.backupData?.filter(
          (el) =>
            this.searchValue &&
            ~el.name
              .toLocaleLowerCase()
              .search(this.searchValue.toLocaleLowerCase())
        )
      : [...(this.backupData ?? [])];
    this.changePage(1);

    if (filterData?.length === 0) {
      this.renderData = [];
      this.rerender();
      this.showNoResult();
      return;
    }

    this.renderData = filterData ?? [];
    this.rerender();
  }

  showNoResult() {
    this.removeAllChild(this.container);
    const textElement = createElement("span");
    textElement.className = "SupportedCryptoTable_textEmprty __paragraph-1";
    const innerTextNode = document.createTextNode(
      `No results for "${this.searchValue}"`
    );
    textElement.appendChild(innerTextNode);
    this.container?.appendChild(textElement);
  }
}

export default SupportedCryptoSearch;
