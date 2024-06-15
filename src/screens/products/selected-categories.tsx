import { COLORS } from "@/enum/colors";
import { Chip, Paper } from "@mui/material";
import React, { useState } from "react";

export interface Label {
  id: number;
  title: string;
  description?: string;
}

interface ChipStyle {
  margin: string;
  cursor: string;
  backgroundColor: string;
  color: string;
  fontWeight: string;
}

const chipStyle: ChipStyle = {
  margin: "4px",
  cursor: "pointer",
  backgroundColor: COLORS.grey.c100,
  color: "#333",
  fontWeight: "500",
};

const selectedChipStyle: ChipStyle = {
  ...chipStyle,
  backgroundColor: COLORS.primary.c900,
  color: "#fff",
};

type Props = {
  labels: Label[];
  selectedLabels: number[];
  setSelectedLabels: any;
};

export default function CateGoriesPicker({
  labels,
  selectedLabels,
  setSelectedLabels,
}: Props) {
  const handleLabelClick = (id: number) => {
    if (selectedLabels.includes(id)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== id));
    } else {
      setSelectedLabels([...selectedLabels, id]);
    }
  };

  const getChipStyle = (id: number) => {
    return selectedLabels.includes(id) ? selectedChipStyle : chipStyle;
  };

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-grey-c600 dark:text-white">
        {"Danh mục"}
        <span className="text-base text-support-c500"> *</span>
      </label>
      <div className="flex flex-row flex-wrap gap-3">
        {labels.map((label) => (
          <Chip
            key={label.id}
            label={label.title}
            clickable
            onClick={() => handleLabelClick(label.id)}
            style={getChipStyle(label.id)}
          />
        ))}
      </div>
    </div>
  );
}
