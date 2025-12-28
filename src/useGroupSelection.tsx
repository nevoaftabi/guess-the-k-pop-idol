import { useState, ChangeEvent } from "react";
import Switch from "./common/Switch";

export interface GroupSelection {
  useGirls: boolean,
  useBoys: boolean,
  verified: boolean
}

export function useGroupSelection() {
  const [groupSelection, setGroupSelection] = useState<GroupSelection>({
    useGirls: true,
    useBoys: true,
    verified: false
  });

  const [imagesId] = useState([
    "./images/0ea08b37-92d3-4373-b353-8c88fb6bd2c3.png",
    "./images/7c6b7b9c-5d6b-44ba-b7ac-fd0c537ba301.png"
  ]);

  type GroupKey = "useGirls" | "useBoys";

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { checked, name } = e.target as HTMLInputElement & { name: GroupKey };

    setGroupSelection(cur => ({
      ...cur,
      [name]: checked
    }));
  }

  function handlePlay() {
    const isValid = groupSelection.useGirls || groupSelection.useBoys;

    setGroupSelection(cur => ({
      ...cur,
      verified: isValid
    }));

    if (!isValid) {
      alert("You didn't select any group!");
    }
  }


  function reset() {
    setGroupSelection({ useBoys: true, useGirls: true, verified: false });
  }

  return { reset, handlePlay, handleChange, imagesId, groupSelection }
}

export function GroupSelection({
  groupSelection,
  imagesId,
  handlePlay,
  handleChange
}: {
  groupSelection: GroupSelection;
  imagesId: string[];
  handlePlay: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="group-selection">
      <div className="group-container">
        <div>
          <img key={imagesId[0]} className="idol group-img" src={imagesId[0]}></img>
          <Switch
            label="Girl Groups"
            name="useGirls"
            checked={groupSelection.useGirls}
            onChange={handleChange}
          />
        </div>
        <div>
          <img key={imagesId[1]} className="idol group-img" src={imagesId[1]}></img>
          <Switch
            label="Boy Groups"
            name="useBoys"
            checked={groupSelection.useBoys}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="button" onClick={handlePlay}>Play</button>
    </div>
  )
}