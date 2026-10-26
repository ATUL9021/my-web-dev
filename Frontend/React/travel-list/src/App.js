import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

function App() {
  let [itemList, setItem] = useState([]);

  function addNewItem(item) {
    setItem((li) => {
      console.log(li);
      return [...li, item];
    });
  }

  function clearList() {
    const confirmed = window.confirm(
      "are you sure you want to delete all items",
    );
    confirmed && setItem([]);
  }

  function markTheItem(id) {
    console.log("marked item ", id);
    setItem((list) => {
      return list.map((listItem) => {
        return listItem.id === id
          ? { ...listItem, packed: !listItem.packed }
          : { ...listItem };
      });
    });
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addNewItem} />
      <PackageList
        itemList={itemList}
        onClearList={clearList}
        onMarkItem={markTheItem}
      />
      <Stats itemList={itemList} />
    </div>
  );
}

function Logo() {
  return <h1>FAR AWAY</h1>;
}

function Form({ onAddItem }) {
  let [quantity, setCount] = useState(1);
  let [description, setDescription] = useState("");
  let myOptionList = [];

  for (let i = 1; i <= 15; i++) {
    myOptionList.push(
      <option value={`${i}`} key={i}>
        {i}
      </option>,
    );
  }

  function addPackingItem() {
    if (!description) return;
    const newObj = { description, quantity, packed: false, id: new Date() };
    onAddItem(newObj);
    setCount(1);
    setDescription("");
  }

  return (
    <form
      className="add-form"
      onSubmit={(e) => {
        e.preventDefault();
        addPackingItem();
      }}
    >
      <h3>What do you need for your trip?</h3>
      <select
        id="item-count"
        value={quantity}
        onChange={(e) => {
          setCount(+e.target.value);
        }}
      >
        {myOptionList}
      </select>
      <input
        type="text"
        placeholder="item"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button type="submit">ADD</button>
    </form>
  );
}

function Item({ item, onMarkItem }) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={(e) => {
          onMarkItem(item.id);
        }}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
    </li>
  );
}
function PackageList({ itemList, onClearList, onMarkItem }) {
  let [sortType, setSortType] = useState("1");
  console.log("my pinrt");
  let sortedItems;

  if (sortType === "1") {
    sortedItems = itemList;
  } else if (sortType === "2") {
    sortedItems = itemList.slice().sort((a, b) => {
      return a.description.localeCompare(b.description);
    });
  } else {
    sortedItems = itemList
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  function doSorting(value) {
    console.log(value);
    setSortType(value);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return <Item item={item} key={item.id} onMarkItem={onMarkItem} />;
        })}
      </ul>

      <div className="actions">
        <select
          value={sortType}
          onChange={(e) => {
            doSorting(e.target.value);
          }}
        >
          <option value="1">SORT BY INPUT ORDER</option>
          <option value="2">SORT BY DESCRIPTION</option>
          <option value="3">SORT BY PACKED DATA</option>
        </select>

        <button
          onClick={(e) => {
            onClearList();
          }}
        >
          Clear List
        </button>
      </div>
    </div>
  );
}

function Stats({ itemList }) {
  let count = 0;
  console.log("hy");
  itemList.forEach((item) => {
    if (item.packed) {
      count++;
    }
  });
  return (
    <footer className="stats">
      <em>
        you have {itemList.length} number of items on your list and you already
        packed {count}{" "}
        {itemList.length !== 0 && (count / itemList.length) * 100}%
      </em>
    </footer>
  );
}

export default App;
