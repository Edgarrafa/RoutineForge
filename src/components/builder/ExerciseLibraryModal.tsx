"use client";

import { useState, useEffect } from "react";

export type BodyPart = "Back" | "Chest" | "Shoulders" | "Legs" | "Arms" | "Core";
export type Category = "Compound" | "Isolation" | "Isometric" | "Plyometric" | "Anti-Rotation";
export type Equipment = "Barbell" | "Dumbbell" | "Kettlebell" | "Cable" | "Machine" | "Bodyweight" | "Band" | "Weighted" | "Plate" | "Trap Bar" | "EZ Bar" | "Landmine" | "Wheel" | "Rope" | "Rings" | "GHD" | "Smith Machine" | "Safety Bar" | "Yoke" | "Log";

export type ChestSubcategory = "Horizontal Push" | "Incline Push" | "Decline Push" | "Chest Stretch";
export type BackSubcategory = "Vertical Pull" | "Horizontal Pull" | "Lower Back" | "Traps" | "Hip Hinge";
export type ShoulderSubcategory = "Front Delt" | "Rear Delt" | "Lateral Delt" | "Stability";
export type LegSubcategory = "Hamstring" | "Quad" | "Glute" | "Calf" | "Adductor" | "Abductor" | "Tibialis";
export type ArmSubcategory = "Bicep" | "Tricep" | "Forearm";
export type CoreSubcategory = "Trunk Flexion" | "Reverse Flexion" | "Rotational" | "Anti-Extension" | "Anti-Lateral Flexion" | "Anti-Rotation";

export type MuscleCode = "GL" | "HV" | "LB" | "LT" | "UB" | "QD" | "AD" | "BI" | "RI" | "RD" | "TR" | "FD" | "MD" | "UP" | "CH" | "BR" | "CF" | "AB" | "OB" | "TA" | "GR" | "FR" | "TI" | "TP" | "RH" | "ES";

export const MUSCLE_NAMES: Record<MuscleCode, string> = {
  GL: "Glutes",
  HV: "Hamstrings",
  LB: "Lower Back",
  LT: "Lats",
  UB: "Upper Back",
  QD: "Quadriceps",
  AD: "Adductors",
  BI: "Biceps",
  RI: "Rotator Cuff",
  RD: "Rear Delts",
  TR: "Triceps",
  FD: "Front Delts",
  MD: "Medial Delts",
  UP: "Upper Chest",
  CH: "Chest",
  BR: "Brachialis",
  CF: "Calves",
  AB: "Abs",
  OB: "Obliques",
  TA: "Transverse Abs",
  GR: "Grip",
  FR: "Forearms",
  TI: "Tibialis",
  TP: "Traps",
  RH: "Rhomboids",
  ES: "Erector Spinae",
};

export type LibraryExercise = {
  id: string;
  name: string;
  bodyPart: BodyPart;
  category: Category;
  equipment: Equipment;
  subcategory:
    | ChestSubcategory
    | BackSubcategory
    | ShoulderSubcategory
    | LegSubcategory
    | ArmSubcategory
    | CoreSubcategory;
  muscles: MuscleCode[];
  image?: string;
};

const BODY_PARTS: BodyPart[] = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

const SUBCATEGORIES_BY_BODY_PART: Record<BodyPart, string[]> = {
  Chest: ["Horizontal Push", "Incline Push", "Decline Push", "Chest Stretch"],
  Back: ["Vertical Pull", "Horizontal Pull", "Lower Back", "Traps", "Hip Hinge"],
  Shoulders: ["Front Delt", "Rear Delt", "Lateral Delt", "Stability"],
  Legs: ["Hamstring", "Quad", "Glute", "Calf", "Adductor", "Abductor", "Tibialis"],
  Arms: ["Bicep", "Tricep", "Forearm"],
  Core: ["Trunk Flexion", "Reverse Flexion", "Rotational", "Anti-Extension", "Anti-Lateral Flexion", "Anti-Rotation"],
};
const EQUIPMENT_TYPES: Equipment[] = ["Barbell", "Dumbbell", "Machine", "Cable", "Bodyweight", "Weighted", "Kettlebell", "Band", "Plate", "Trap Bar", "EZ Bar", "Landmine", "Wheel", "Rope", "Rings", "GHD", "Smith Machine", "Safety Bar", "Yoke", "Log"];

const EQUIPMENT_STYLES: Record<string, string> = {
  Barbell: "bg-[#f4257b] text-white",
  Cable: "bg-[#10b981] text-white",
  Dumbbell: "bg-[#8b5cf6] text-white",
  Bodyweight: "bg-[#374151] text-gray-300 border border-gray-600",
  Machine: "bg-[#f97316] text-white",
};

const SQ_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAo-coYh2NIGKylgQnKeERt32jZIL_wZG7LzDmYQ6upYxM09zLBehwWOtCskct_FAYGbRoiBYRr5qT5ZmUOOTnzGHRSUgmk3nyCD1ZUC3RYkRFH0NowMbOTLVJRwhH6a10VBZCYHge2f4ND0i1elB7Luc_dmZkd3zeXEfHedBYdrBYmRYft5Q70wPf1_eiS433ncitNRjrRFnuiOSUNo4pxJcNATKLfQ1luL9rHdi-SjZ5P20fXQqhs_tEpj9Wpmy3i8EsGNa1zYlg";
const LP_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCenjHDAWxfnkkD-T5x-rw5evl4gJdaKFSVA8kRoRifCsleB1aYPG-3PWLE4zP3OcY8hF1TtMQdSEf_rbu6OQUPhf0MC1AyrXweY6qNA55YUODrI6WpZerTzbyv6XUBLfAW0gDR-s0XfIEKG1BgxSESvdyQI20H6DPTndlxsQz6fYjEsuNVOTQQXNaTE2QCAP5hJNbLgTwRIj-9d8lvIRDMaXvEnC2k4RGxVWNuFjz6Tz0UgtOvPLyIfKjPa4aUT6_526zC4t3GoKU";

// TODO: replace this inline array with:
//   const [exercises, setExercises] = useState<LibraryExerciseSummary[]>([]);
//   useEffect(() => {
//     exercisesApi.getExercises({ category, equipment, bodyPart, query }).then(setExercises);
//   }, [category, equipment, bodyPart, query]);
// Import: import { exercisesApi, type LibraryExerciseSummary } from "@/lib/api";
const EXERCISES: LibraryExercise[] = [
  // Back (40+)
  { id: "deadlift", name: "Conventional Deadlift", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["GL", "HV", "LB", "LT", "UB", "ES", "TP"] },
  { id: "sumo-deadlift", name: "Sumo Deadlift", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["GL", "QD", "HV", "AD", "ES", "TP"] },
  { id: "rack-pull", name: "Rack Pull", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["GL", "UB", "LT", "ES", "TP"] },
  { id: "kb-deadlift", name: "Kettlebell Deadlift", bodyPart: "Back", category: "Compound", equipment: "Kettlebell", subcategory: "Hip Hinge", muscles: ["GL", "HV", "LB", "ES"] },
  { id: "trap-bar-deadlift", name: "Trap Bar Deadlift", bodyPart: "Back", category: "Compound", equipment: "Trap Bar", subcategory: "Hip Hinge", muscles: ["QD", "GL", "HV", "ES", "TP"] },
  { id: "lat-pulldown", name: "Wide Grip Lat Pulldown", bodyPart: "Back", category: "Compound", equipment: "Cable", subcategory: "Vertical Pull", muscles: ["LT", "UB", "BI"] },
  { id: "close-lat-pulldown", name: "Close Grip Lat Pulldown", bodyPart: "Back", category: "Compound", equipment: "Cable", subcategory: "Vertical Pull", muscles: ["LT", "BI", "UB"] },
  { id: "pull-up", name: "Wide Grip Pull Up", bodyPart: "Back", category: "Compound", equipment: "Bodyweight", subcategory: "Vertical Pull", muscles: ["LT", "UB", "BI"] },
  { id: "chin-up", name: "Chin Up", bodyPart: "Back", category: "Compound", equipment: "Bodyweight", subcategory: "Vertical Pull", muscles: ["BI", "LT", "UB"] },
  { id: "neutral-pull-up", name: "Neutral Grip Pull Up", bodyPart: "Back", category: "Compound", equipment: "Bodyweight", subcategory: "Vertical Pull", muscles: ["LT", "BI"] },
  { id: "db-row", name: "Single Arm DB Row", bodyPart: "Back", category: "Compound", equipment: "Dumbbell", subcategory: "Horizontal Pull", muscles: ["LT", "RD", "UB", "RH"] },
  { id: "barbell-row", name: "Bent Over Barbell Row", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Horizontal Pull", muscles: ["LT", "UB", "RD", "RH"] },
  { id: "pendlay-row", name: "Pendlay Row", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Horizontal Pull", muscles: ["LT", "UB", "RH"] },
  { id: "tbar-row", name: "T-Bar Row", bodyPart: "Back", category: "Compound", equipment: "Machine", subcategory: "Horizontal Pull", muscles: ["LT", "UB", "RD", "RH"] },
  { id: "seated-cable-row", name: "Seated Cable Row V-Bar", bodyPart: "Back", category: "Compound", equipment: "Cable", subcategory: "Horizontal Pull", muscles: ["LT", "RD", "BI", "RH"] },
  { id: "chest-sup-row", name: "Chest Supported T-Bar Row", bodyPart: "Back", category: "Compound", equipment: "Machine", subcategory: "Horizontal Pull", muscles: ["LT", "UB", "RD", "RH"] },
  { id: "inverted-row", name: "Inverted Row", bodyPart: "Back", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Pull", muscles: ["LT", "UB", "RD", "RH"] },
  { id: "australia-pullup", name: "Australian Pull Up", bodyPart: "Back", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Pull", muscles: ["LT", "UB", "RH"] },
  { id: "straight-arm-pd", name: "Straight Arm Pulldown", bodyPart: "Back", category: "Isolation", equipment: "Cable", subcategory: "Vertical Pull", muscles: ["LT"] },
  { id: "pullover", name: "DB Pullover", bodyPart: "Back", category: "Isolation", equipment: "Dumbbell", subcategory: "Vertical Pull", muscles: ["LT", "CH"] },
  { id: "superman", name: "Superman Hold", bodyPart: "Back", category: "Isolation", equipment: "Bodyweight", subcategory: "Lower Back", muscles: ["LB", "ES"] },
  { id: "hyperextension", name: "45 Degree Hyperextension", bodyPart: "Back", category: "Isolation", equipment: "Machine", subcategory: "Lower Back", muscles: ["LB", "GL", "ES"] },
  { id: "good-morning", name: "Seated Good Morning", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["HV", "LB", "ES"] },
  { id: "jefferson-curl", name: "Jefferson Curl", bodyPart: "Back", category: "Isolation", equipment: "Kettlebell", subcategory: "Lower Back", muscles: ["LB", "ES"] },
  { id: "yates-row", name: "Yates Row", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Horizontal Pull", muscles: ["LT", "UB", "RH"] },
  { id: "meadows-row", name: "Meadows Row", bodyPart: "Back", category: "Compound", equipment: "Landmine", subcategory: "Horizontal Pull", muscles: ["LT", "RD", "UB", "RH"] },
  { id: "kb-row", name: "Single Arm KB Row", bodyPart: "Back", category: "Compound", equipment: "Kettlebell", subcategory: "Horizontal Pull", muscles: ["LT", "RD", "RH"] },
  { id: "towel-row", name: "Towel Inverted Row", bodyPart: "Back", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Pull", muscles: ["LT", "UB", "GR", "RH"] },
  { id: "superman-pull", name: "Superman Pull", bodyPart: "Back", category: "Isolation", equipment: "Bodyweight", subcategory: "Lower Back", muscles: ["LB", "ES"] },
  { id: "bird-dog-back", name: "Bird Dog Extension", bodyPart: "Back", category: "Isolation", equipment: "Bodyweight", subcategory: "Lower Back", muscles: ["LB", "GL", "ES"] },
  { id: "db-straight-arm-pd", name: "DB Straight Arm Pulldown", bodyPart: "Back", category: "Isolation", equipment: "Dumbbell", subcategory: "Vertical Pull", muscles: ["LT"] },
  { id: "band-straight-arm-pd", name: "Band Straight Arm Pulldown", bodyPart: "Back", category: "Isolation", equipment: "Band", subcategory: "Vertical Pull", muscles: ["LT"] },
  { id: "seated-band-row", name: "Seated Band Row", bodyPart: "Back", category: "Compound", equipment: "Band", subcategory: "Horizontal Pull", muscles: ["LT", "RD", "RH"] },
  { id: "db-deadlift", name: "Dumbbell Deadlift", bodyPart: "Back", category: "Compound", equipment: "Dumbbell", subcategory: "Hip Hinge", muscles: ["GL", "HV", "LB", "ES"] },
  { id: "deficit-deadlift", name: "Deficit Deadlift", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["GL", "HV", "LB", "LT", "ES", "TP"] },
  { id: "stiff-leg-deadlift", name: "Stiff Leg Deadlift", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["HV", "LB", "ES"] },
  { id: "romanian-deadlift", name: "Barbell Romanian Deadlift", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["HV", "GL", "LB", "ES"] },
  { id: "snatch-grip-deadlift", name: "Snatch Grip Deadlift", bodyPart: "Back", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["LT", "UB", "HV", "ES", "TP"] },
  { id: "pull-up-weighted", name: "Weighted Pull Up", bodyPart: "Back", category: "Compound", equipment: "Weighted", subcategory: "Vertical Pull", muscles: ["LT", "UB"] },
  { id: "muscle-up", name: "Muscle Up", bodyPart: "Back", category: "Compound", equipment: "Bodyweight", subcategory: "Vertical Pull", muscles: ["LT", "UB", "TR"] },
  { id: "archer-pullup", name: "Archer Pull Up", bodyPart: "Back", category: "Compound", equipment: "Bodyweight", subcategory: "Vertical Pull", muscles: ["LT"] },
  { id: "l-sit-pullup", name: "L-Sit Pull Up", bodyPart: "Back", category: "Compound", equipment: "Bodyweight", subcategory: "Vertical Pull", muscles: ["LT", "AB"] },
  { id: "chest-sup-db-row", name: "Chest Supported DB Row", bodyPart: "Back", category: "Compound", equipment: "Dumbbell", subcategory: "Horizontal Pull", muscles: ["LT", "RD", "RH"] },
  { id: "kroc-row", name: "Kroc Row", bodyPart: "Back", category: "Compound", equipment: "Dumbbell", subcategory: "Horizontal Pull", muscles: ["LT", "UB", "RH"] },
  { id: "cable-row-wide", name: "Wide Grip Seated Cable Row", bodyPart: "Back", category: "Compound", equipment: "Cable", subcategory: "Horizontal Pull", muscles: ["LT", "UB", "RH"] },
  { id: "one-arm-cable-row", name: "One Arm Cable Row", bodyPart: "Back", category: "Compound", equipment: "Cable", subcategory: "Horizontal Pull", muscles: ["LT", "RD", "RH"] },
  { id: "machine-row", name: "Leverage Machine Row", bodyPart: "Back", category: "Compound", equipment: "Machine", subcategory: "Horizontal Pull", muscles: ["LT", "UB", "RH"] },
  { id: "hyper-back-ext", name: "Hyper Extension Hold", bodyPart: "Back", category: "Isolation", equipment: "Machine", subcategory: "Lower Back", muscles: ["LB", "ES"] },
  { id: "ghd-back-ext", name: "GHD Back Extension", bodyPart: "Back", category: "Isolation", equipment: "GHD", subcategory: "Lower Back", muscles: ["LB", "GL", "ES"] },
  { id: "reverse-hyper", name: "Reverse Hyper", bodyPart: "Back", category: "Isolation", equipment: "Machine", subcategory: "Lower Back", muscles: ["LB", "GL", "ES"] },
  { id: "db-shrug", name: "Dumbbell Shrug", bodyPart: "Back", category: "Isolation", equipment: "Dumbbell", subcategory: "Traps", muscles: ["UB", "TR", "TP"] },
  { id: "rack-pull-shrug", name: "Rack Pull Shrug", bodyPart: "Back", category: "Isolation", equipment: "Barbell", subcategory: "Traps", muscles: ["UB", "TP"] },

  // Chest (40+)
  { id: "bench-press", name: "Flat Bench Press", bodyPart: "Chest", category: "Compound", equipment: "Barbell", subcategory: "Horizontal Push", muscles: ["CH", "TR", "FD"] },
  { id: "db-bench-press", name: "Flat DB Bench Press", bodyPart: "Chest", category: "Compound", equipment: "Dumbbell", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "incline-bench", name: "Incline Bench Press", bodyPart: "Chest", category: "Compound", equipment: "Barbell", subcategory: "Incline Push", muscles: ["UP", "CH", "TR"] },
  { id: "incline-db", name: "Incline DB Press", bodyPart: "Chest", category: "Compound", equipment: "Dumbbell", subcategory: "Incline Push", muscles: ["UP", "CH", "TR"] },
  { id: "decline-bench", name: "Decline Bench Press", bodyPart: "Chest", category: "Compound", equipment: "Barbell", subcategory: "Decline Push", muscles: ["CH", "TR"] },
  { id: "decline-db", name: "Decline DB Press", bodyPart: "Chest", category: "Compound", equipment: "Dumbbell", subcategory: "Decline Push", muscles: ["CH", "TR"] },
  { id: "dip-chest", name: "Chest Dip", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Decline Push", muscles: ["CH", "TR"] },
  { id: "weighted-dip", name: "Weighted Chest Dip", bodyPart: "Chest", category: "Compound", equipment: "Weighted", subcategory: "Decline Push", muscles: ["CH", "TR"] },
  { id: "push-up", name: "Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "diamond-pushup", name: "Diamond Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "wide-pushup", name: "Wide Grip Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Push", muscles: ["CH"] },
  { id: "archer-pushup", name: "Archer Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Push", muscles: ["CH"] },
  { id: "cable-fly", name: "Low to High Cable Fly", bodyPart: "Chest", category: "Isolation", equipment: "Cable", subcategory: "Chest Stretch", muscles: ["UP", "CH"] },
  { id: "db-fly", name: "Flat DB Fly", bodyPart: "Chest", category: "Isolation", equipment: "Dumbbell", subcategory: "Chest Stretch", muscles: ["CH"] },
  { id: "incline-fly", name: "Incline DB Fly", bodyPart: "Chest", category: "Isolation", equipment: "Dumbbell", subcategory: "Chest Stretch", muscles: ["UP"] },
  { id: "pec-deck", name: "Pec Deck Machine", bodyPart: "Chest", category: "Isolation", equipment: "Machine", subcategory: "Chest Stretch", muscles: ["CH"] },
  { id: "svend-press", name: "Svend Press", bodyPart: "Chest", category: "Isolation", equipment: "Plate", subcategory: "Chest Stretch", muscles: ["CH"] },
  { id: "landmine-press", name: "Landmine Chest Press", bodyPart: "Chest", category: "Compound", equipment: "Barbell", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "guillotine-press", name: "Guillotine Bench Press", bodyPart: "Chest", category: "Compound", equipment: "Barbell", subcategory: "Horizontal Push", muscles: ["CH", "UP"] },
  { id: "floor-press", name: "Dumbbell Floor Press", bodyPart: "Chest", category: "Compound", equipment: "Dumbbell", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "machine-chest-press", name: "Machine Chest Press", bodyPart: "Chest", category: "Compound", equipment: "Machine", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "hammer-press", name: "Hammer Strength Chest Press", bodyPart: "Chest", category: "Compound", equipment: "Machine", subcategory: "Horizontal Push", muscles: ["CH"] },
  { id: "crossover", name: "Cable Crossover", bodyPart: "Chest", category: "Isolation", equipment: "Cable", subcategory: "Chest Stretch", muscles: ["CH", "UP"] },
  { id: "high-cable-fly", name: "High to Low Cable Fly", bodyPart: "Chest", category: "Isolation", equipment: "Cable", subcategory: "Chest Stretch", muscles: ["CH"] },
  { id: "plate-press", name: "Plate Press", bodyPart: "Chest", category: "Isolation", equipment: "Plate", subcategory: "Chest Stretch", muscles: ["CH"] },
  { id: "db-pullover", name: "Dumbbell Chest Pullover", bodyPart: "Chest", category: "Isolation", equipment: "Dumbbell", subcategory: "Chest Stretch", muscles: ["CH", "LT"] },
  { id: "decline-pushup", name: "Decline Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Decline Push", muscles: ["CH"] },
  { id: "incline-pushup", name: "Incline Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Incline Push", muscles: ["UP", "CH"] },
  { id: "plyo-pushup", name: "Plyometric Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "hand-release-pushup", name: "Hand Release Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Push", muscles: ["CH"] },
  { id: "kb-floor-press", name: "Kettlebell Floor Press", bodyPart: "Chest", category: "Compound", equipment: "Kettlebell", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "neutral-grip-press", name: "Neutral Grip DB Press", bodyPart: "Chest", category: "Compound", equipment: "Dumbbell", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "spoto-press", name: "Spoto Pause Bench Press", bodyPart: "Chest", category: "Compound", equipment: "Barbell", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "pin-press", name: "Board/Pin Press", bodyPart: "Chest", category: "Compound", equipment: "Barbell", subcategory: "Horizontal Push", muscles: ["CH"] },
  { id: "dips-assisted", name: "Assisted Chest Dip", bodyPart: "Chest", category: "Compound", equipment: "Machine", subcategory: "Decline Push", muscles: ["CH", "TR"] },
  { id: "ring-dip", name: "Ring Chest Dip", bodyPart: "Chest", category: "Compound", equipment: "Rings", subcategory: "Decline Push", muscles: ["CH", "TR"] },
  { id: "one-arm-pushup", name: "One Arm Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Push", muscles: ["CH"] },
  { id: "pseudo-planche-pushup", name: "Pseudo Planche Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Push", muscles: ["UP", "CH"] },
  { id: "typewriter-pushup", name: "Typewriter Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Push", muscles: ["CH"] },
  { id: "deficit-pushup", name: "Deficit Push Up", bodyPart: "Chest", category: "Compound", equipment: "Bodyweight", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "band-chest-fly", name: "Resistance Band Chest Fly", bodyPart: "Chest", category: "Isolation", equipment: "Band", subcategory: "Chest Stretch", muscles: ["CH"] },
  { id: "hex-press", name: "Hex Press", bodyPart: "Chest", category: "Isolation", equipment: "Dumbbell", subcategory: "Chest Stretch", muscles: ["CH"] },
  { id: "tate-press", name: "Tate Press", bodyPart: "Chest", category: "Isolation", equipment: "Dumbbell", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },
  { id: "kneeling-svend", name: "Kneeling Svend Press", bodyPart: "Chest", category: "Isolation", equipment: "Plate", subcategory: "Chest Stretch", muscles: ["CH"] },
  { id: "slingshot-press", name: "Slingshot Bench Press", bodyPart: "Chest", category: "Compound", equipment: "Barbell", subcategory: "Horizontal Push", muscles: ["CH", "TR"] },

  // Shoulders (40+)
  { id: "ohp", name: "Standing Overhead Press", bodyPart: "Shoulders", category: "Compound", equipment: "Barbell", subcategory: "Front Delt", muscles: ["FD", "TR", "MD"] },
  { id: "seated-ohp", name: "Seated DB Overhead Press", bodyPart: "Shoulders", category: "Compound", equipment: "Dumbbell", subcategory: "Front Delt", muscles: ["FD", "MD", "TR"] },
  { id: "arnold-press", name: "Arnold Press", bodyPart: "Shoulders", category: "Compound", equipment: "Dumbbell", subcategory: "Front Delt", muscles: ["FD", "MD", "RD"] },
  { id: "kb-ohp", name: "Kettlebell Overhead Press", bodyPart: "Shoulders", category: "Compound", equipment: "Kettlebell", subcategory: "Front Delt", muscles: ["FD", "MD"] },
  { id: "pike-pushup", name: "Pike Push Up", bodyPart: "Shoulders", category: "Compound", equipment: "Bodyweight", subcategory: "Front Delt", muscles: ["FD", "TR"] },
  { id: "handstand-pushup", name: "Handstand Push Up", bodyPart: "Shoulders", category: "Compound", equipment: "Bodyweight", subcategory: "Front Delt", muscles: ["FD", "TR", "MD"] },
  { id: "upright-row", name: "EZ Bar Upright Row", bodyPart: "Shoulders", category: "Compound", equipment: "EZ Bar", subcategory: "Lateral Delt", muscles: ["MD", "TR", "UB", "TP"] },
  { id: "lateral-raise", name: "DB Lateral Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Lateral Delt", muscles: ["MD", "FD"] },
  { id: "cable-lateral", name: "Cable Lateral Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Cable", subcategory: "Lateral Delt", muscles: ["MD"] },
  { id: "kb-lateral", name: "Kettlebell Lateral Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Kettlebell", subcategory: "Lateral Delt", muscles: ["MD"] },
  { id: "front-raise", name: "DB Front Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Front Delt", muscles: ["FD"] },
  { id: "rear-delt-fly", name: "DB Rear Delt Fly", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Rear Delt", muscles: ["RD", "RI", "RH"] },
  { id: "reverse-pec-deck", name: "Reverse Pec Deck", bodyPart: "Shoulders", category: "Isolation", equipment: "Machine", subcategory: "Rear Delt", muscles: ["RD", "RH"] },
  { id: "face-pull", name: "Cable Face Pull", bodyPart: "Shoulders", category: "Isolation", equipment: "Cable", subcategory: "Rear Delt", muscles: ["RD", "RI", "TR", "RH"] },
  { id: "barbell-shrug", name: "Barbell Shrug", bodyPart: "Shoulders", category: "Isolation", equipment: "Barbell", subcategory: "Traps", muscles: ["UB", "TR", "TP"] },
  { id: "db-shrug-shoulders", name: "Dumbbell Shrug", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Traps", muscles: ["UB", "TP"] },
  { id: "rack-shrug", name: "Behind Back Barbell Shrug", bodyPart: "Shoulders", category: "Isolation", equipment: "Barbell", subcategory: "Traps", muscles: ["UB", "TR", "TP"] },
  { id: "farmer-walk", name: "Farmer's Walk", bodyPart: "Shoulders", category: "Compound", equipment: "Dumbbell", subcategory: "Traps", muscles: ["UB", "TR", "GR", "TP"] },
  { id: "smith-ohp", name: "Smith Machine Overhead Press", bodyPart: "Shoulders", category: "Compound", equipment: "Smith Machine", subcategory: "Front Delt", muscles: ["FD", "TR", "MD"] },
  { id: "machine-shoulder-press", name: "Machine Shoulder Press", bodyPart: "Shoulders", category: "Compound", equipment: "Machine", subcategory: "Front Delt", muscles: ["FD", "MD"] },
  { id: "log-press", name: "Log Press", bodyPart: "Shoulders", category: "Compound", equipment: "Log", subcategory: "Front Delt", muscles: ["FD", "TR", "UB"] },
  { id: "z-press", name: "Z Press", bodyPart: "Shoulders", category: "Compound", equipment: "Barbell", subcategory: "Front Delt", muscles: ["FD", "MD"] },
  { id: "wall-handstand-pushup", name: "Wall Handstand Push Up", bodyPart: "Shoulders", category: "Compound", equipment: "Bodyweight", subcategory: "Front Delt", muscles: ["FD", "TR"] },
  { id: "crab-walk", name: "Crab Walk", bodyPart: "Shoulders", category: "Compound", equipment: "Bodyweight", subcategory: "Stability", muscles: ["FD", "TR"] },
  { id: "barbell-upright-row", name: "Barbell Upright Row", bodyPart: "Shoulders", category: "Compound", equipment: "Barbell", subcategory: "Lateral Delt", muscles: ["MD", "TR", "UB", "TP"] },
  { id: "db-front-raise", name: "Alternating DB Front Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Front Delt", muscles: ["FD", "MD"] },
  { id: "plate-front-raise", name: "Plate Front Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Plate", subcategory: "Front Delt", muscles: ["FD"] },
  { id: "cable-front-raise", name: "Cable Front Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Cable", subcategory: "Front Delt", muscles: ["FD"] },
  { id: "underhand-front-raise", name: "Underhand Front Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Front Delt", muscles: ["FD"] },
  { id: "band-lateral-raise", name: "Band Lateral Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Band", subcategory: "Lateral Delt", muscles: ["MD"] },
  { id: "partial-lateral-raise", name: "Partial ROM Lateral Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Lateral Delt", muscles: ["MD"] },
  { id: "db-rear-delt-row", name: "DB Rear Delt Row", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Rear Delt", muscles: ["RD", "RI", "RH"] },
  { id: "cable-rear-delt-fly", name: "Cable Rear Delt Fly", bodyPart: "Shoulders", category: "Isolation", equipment: "Cable", subcategory: "Rear Delt", muscles: ["RD", "RH"] },
  { id: "band-face-pull", name: "Band Face Pull", bodyPart: "Shoulders", category: "Isolation", equipment: "Band", subcategory: "Rear Delt", muscles: ["RD", "RI", "RH"] },
  { id: "prone-rear-delt", name: "Prone Rear Delt Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Rear Delt", muscles: ["RD", "RH"] },
  { id: "machine-lateral-raise", name: "Machine Lateral Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Machine", subcategory: "Lateral Delt", muscles: ["MD"] },
  { id: "kb-upright-row", name: "Kettlebell Upright Row", bodyPart: "Shoulders", category: "Compound", equipment: "Kettlebell", subcategory: "Lateral Delt", muscles: ["MD", "TR", "TP"] },
  { id: "rack-pull-shrug-shoulders", name: "Rack Pull Shrug", bodyPart: "Shoulders", category: "Isolation", equipment: "Barbell", subcategory: "Traps", muscles: ["UB", "TR", "TP"] },
  { id: "overhead-shrug", name: "Overhead Shrug", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Traps", muscles: ["UB", "TP"] },
  { id: "yoke-walk", name: "Yoke Walk", bodyPart: "Shoulders", category: "Compound", equipment: "Yoke", subcategory: "Traps", muscles: ["UB", "TR", "GR", "TP"] },
  { id: "trap-bar-shrug", name: "Trap Bar Shrug", bodyPart: "Shoulders", category: "Isolation", equipment: "Trap Bar", subcategory: "Traps", muscles: ["UB", "TP"] },
  { id: "power-shrug", name: "Power Shrug", bodyPart: "Shoulders", category: "Compound", equipment: "Barbell", subcategory: "Traps", muscles: ["UB", "TR", "TP"] },
  { id: "incline-front-raise", name: "Incline Bench Front Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Front Delt", muscles: ["FD"] },
  { id: "leaning-lateral", name: "Leaning Lateral Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Dumbbell", subcategory: "Lateral Delt", muscles: ["MD"] },
  { id: "single-arm-cable-lateral", name: "Single Arm Cable Lateral Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Cable", subcategory: "Lateral Delt", muscles: ["MD"] },
  { id: "whiplash-lateral", name: "Whiplash Lateral Raise", bodyPart: "Shoulders", category: "Isolation", equipment: "Cable", subcategory: "Lateral Delt", muscles: ["MD"] },
  { id: "shoulder-tap", name: "Shoulder Tap Plank", bodyPart: "Shoulders", category: "Compound", equipment: "Bodyweight", subcategory: "Stability", muscles: ["FD", "MD", "TR"] },
  { id: "tabletop-pike", name: "Tabletop Reverse Pike", bodyPart: "Shoulders", category: "Isolation", equipment: "Bodyweight", subcategory: "Rear Delt", muscles: ["RD", "TR", "RH"] },
  { id: "y-press", name: "Y Press", bodyPart: "Shoulders", category: "Compound", equipment: "Dumbbell", subcategory: "Front Delt", muscles: ["FD", "MD"] },
  { id: "bus-driver", name: "Bus Driver", bodyPart: "Shoulders", category: "Isolation", equipment: "Plate", subcategory: "Front Delt", muscles: ["FD"] },
  { id: "band-pull-apart", name: "Band Pull Apart", bodyPart: "Shoulders", category: "Isolation", equipment: "Band", subcategory: "Rear Delt", muscles: ["RI", "RD", "RH"] },
  { id: "rear-delt-row", name: "Rear Delt Cable Row", bodyPart: "Shoulders", category: "Isolation", equipment: "Cable", subcategory: "Rear Delt", muscles: ["RD", "RI", "RH"] },

  // Legs (50+)
  { id: "back-squat", name: "Barbell Back Squat", bodyPart: "Legs", category: "Compound", equipment: "Barbell", subcategory: "Quad", muscles: ["QD", "GL", "HV", "ES"] },
  { id: "front-squat", name: "Barbell Front Squat", bodyPart: "Legs", category: "Compound", equipment: "Barbell", subcategory: "Quad", muscles: ["QD", "GL", "AD"] },
  { id: "goblet-squat", name: "Goblet Squat", bodyPart: "Legs", category: "Compound", equipment: "Kettlebell", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "db-goblet", name: "DB Goblet Squat", bodyPart: "Legs", category: "Compound", equipment: "Dumbbell", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "leg-press", name: "45 Degree Leg Press", bodyPart: "Legs", category: "Compound", equipment: "Machine", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "hack-squat", name: "Hack Squat Machine", bodyPart: "Legs", category: "Compound", equipment: "Machine", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "bulgarian-split", name: "Bulgarian Split Squat", bodyPart: "Legs", category: "Compound", equipment: "Dumbbell", subcategory: "Quad", muscles: ["QD", "GL", "HV"] },
  { id: "kb-bulgarian", name: "KB Bulgarian Split Squat", bodyPart: "Legs", category: "Compound", equipment: "Kettlebell", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "walking-lunge", name: "Walking Lunge", bodyPart: "Legs", category: "Compound", equipment: "Dumbbell", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "reverse-lunge", name: "Reverse Lunge", bodyPart: "Legs", category: "Compound", equipment: "Bodyweight", subcategory: "Quad", muscles: ["GL", "QD"] },
  { id: "jump-squat", name: "Jump Squat", bodyPart: "Legs", category: "Compound", equipment: "Bodyweight", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "pistol-squat", name: "Pistol Squat", bodyPart: "Legs", category: "Compound", equipment: "Bodyweight", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "rdl", name: "Barbell Romanian Deadlift", bodyPart: "Legs", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["HV", "GL", "ES"] },
  { id: "db-rdl", name: "DB Romanian Deadlift", bodyPart: "Legs", category: "Compound", equipment: "Dumbbell", subcategory: "Hip Hinge", muscles: ["HV", "GL", "ES"] },
  { id: "single-leg-rdl", name: "Single Leg RDL", bodyPart: "Legs", category: "Compound", equipment: "Dumbbell", subcategory: "Hip Hinge", muscles: ["HV", "GL", "ES"] },
  { id: "stiff-leg-dl", name: "Stiff Leg Deadlift", bodyPart: "Legs", category: "Isolation", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["HV", "ES"] },
  { id: "lying-leg-curl", name: "Lying Leg Curl", bodyPart: "Legs", category: "Isolation", equipment: "Machine", subcategory: "Hamstring", muscles: ["HV"] },
  { id: "seated-leg-curl", name: "Seated Leg Curl", bodyPart: "Legs", category: "Isolation", equipment: "Machine", subcategory: "Hamstring", muscles: ["HV"] },
  { id: "glute-ham-raise", name: "Glute Ham Raise", bodyPart: "Legs", category: "Compound", equipment: "Bodyweight", subcategory: "Hamstring", muscles: ["HV", "GL", "ES"] },
  { id: "leg-ext", name: "Leg Extension", bodyPart: "Legs", category: "Isolation", equipment: "Machine", subcategory: "Quad", muscles: ["QD"] },
  { id: "hip-thrust", name: "Barbell Hip Thrust", bodyPart: "Legs", category: "Isolation", equipment: "Barbell", subcategory: "Glute", muscles: ["GL", "HV"] },
  { id: "kb-swing", name: "Kettlebell Swing", bodyPart: "Legs", category: "Compound", equipment: "Kettlebell", subcategory: "Hip Hinge", muscles: ["GL", "HV", "ES"] },
  { id: "glute-bridge", name: "Single Leg Glute Bridge", bodyPart: "Legs", category: "Isolation", equipment: "Bodyweight", subcategory: "Glute", muscles: ["GL"] },
  { id: "standing-calf-raise", name: "Standing Calf Raise", bodyPart: "Legs", category: "Isolation", equipment: "Machine", subcategory: "Calf", muscles: ["CF"] },
  { id: "seated-calf-raise", name: "Seated Calf Raise", bodyPart: "Legs", category: "Isolation", equipment: "Machine", subcategory: "Calf", muscles: ["CF"] },
  { id: "donkey-calf", name: "Donkey Calf Raise", bodyPart: "Legs", category: "Isolation", equipment: "Machine", subcategory: "Calf", muscles: ["CF"] },
  { id: "jump-rope", name: "Jump Rope", bodyPart: "Legs", category: "Compound", equipment: "Rope", subcategory: "Calf", muscles: ["CF", "QD"] },
  { id: "wall-sit", name: "Wall Sit", bodyPart: "Legs", category: "Isolation", equipment: "Bodyweight", subcategory: "Quad", muscles: ["QD"] },
  { id: "safety-bar-squat", name: "Safety Bar Squat", bodyPart: "Legs", category: "Compound", equipment: "Safety Bar", subcategory: "Quad", muscles: ["QD", "GL", "HV", "ES"] },
  { id: "overhead-squat", name: "Overhead Squat", bodyPart: "Legs", category: "Compound", equipment: "Barbell", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "zercher-squat", name: "Zercher Squat", bodyPart: "Legs", category: "Compound", equipment: "Barbell", subcategory: "Quad", muscles: ["QD", "GL", "HV", "ES"] },
  { id: "belt-squat", name: "Belt Squat", bodyPart: "Legs", category: "Compound", equipment: "Machine", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "sissy-squat", name: "Sissy Squat", bodyPart: "Legs", category: "Isolation", equipment: "Bodyweight", subcategory: "Quad", muscles: ["QD"] },
  { id: "spanish-squat", name: "Spanish Squat", bodyPart: "Legs", category: "Isolation", equipment: "Band", subcategory: "Quad", muscles: ["QD"] },
  { id: "front-foot-elevated", name: "Front Foot Elevated Split Squat", bodyPart: "Legs", category: "Compound", equipment: "Dumbbell", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "curtsy-lunge", name: "Curtsy Lunge", bodyPart: "Legs", category: "Compound", equipment: "Dumbbell", subcategory: "Quad", muscles: ["GL", "QD", "AD"] },
  { id: "lateral-lunge", name: "Lateral Lunge", bodyPart: "Legs", category: "Compound", equipment: "Bodyweight", subcategory: "Quad", muscles: ["AD", "QD", "GL"] },
  { id: "jump-lunge", name: "Jumping Lunge", bodyPart: "Legs", category: "Plyometric", equipment: "Bodyweight", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "skater-squat", name: "Skater Squat", bodyPart: "Legs", category: "Compound", equipment: "Bodyweight", subcategory: "Quad", muscles: ["QD"] },
  { id: "cossack-squat", name: "Cossack Squat", bodyPart: "Legs", category: "Compound", equipment: "Bodyweight", subcategory: "Quad", muscles: ["AD", "QD", "GL"] },
  { id: "trap-bar-deadlift-legs", name: "Trap Bar Deadlift", bodyPart: "Legs", category: "Compound", equipment: "Trap Bar", subcategory: "Hip Hinge", muscles: ["QD", "GL", "HV", "ES", "TP"] },
  { id: "sumo-deadlift-legs", name: "Sumo Deadlift", bodyPart: "Legs", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["GL", "QD", "HV", "AD", "ES", "TP"] },
  { id: "good-morning-legs", name: "Barbell Good Morning", bodyPart: "Legs", category: "Compound", equipment: "Barbell", subcategory: "Hip Hinge", muscles: ["HV", "GL", "LB", "ES"] },
  { id: "nordic-curl", name: "Nordic Hamstring Curl", bodyPart: "Legs", category: "Isolation", equipment: "Bodyweight", subcategory: "Hamstring", muscles: ["HV"] },
  { id: "band-leg-curl", name: "Band Leg Curl", bodyPart: "Legs", category: "Isolation", equipment: "Band", subcategory: "Hamstring", muscles: ["HV"] },
  { id: "standing-leg-curl", name: "Standing Leg Curl", bodyPart: "Legs", category: "Isolation", equipment: "Machine", subcategory: "Hamstring", muscles: ["HV"] },
  { id: "adductor-machine", name: "Adductor Machine", bodyPart: "Legs", category: "Isolation", equipment: "Machine", subcategory: "Adductor", muscles: ["AD"] },
  { id: "abductor-machine", name: "Abductor Machine", bodyPart: "Legs", category: "Isolation", equipment: "Machine", subcategory: "Abductor", muscles: ["AB"] },
  { id: "single-leg-press", name: "Single Leg Press", bodyPart: "Legs", category: "Compound", equipment: "Machine", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "band-glute-kickback", name: "Band Glute Kickback", bodyPart: "Legs", category: "Isolation", equipment: "Band", subcategory: "Glute", muscles: ["GL"] },
  { id: "cable-kickback", name: "Cable Glute Kickback", bodyPart: "Legs", category: "Isolation", equipment: "Cable", subcategory: "Glute", muscles: ["GL"] },
  { id: "frog-pump", name: "Frog Pump", bodyPart: "Legs", category: "Isolation", equipment: "Bodyweight", subcategory: "Glute", muscles: ["GL"] },
  { id: "45-degree-calf", name: "45 Degree Calf Raise", bodyPart: "Legs", category: "Isolation", equipment: "Machine", subcategory: "Calf", muscles: ["CF"] },
  { id: "single-leg-calf", name: "Single Leg Calf Raise", bodyPart: "Legs", category: "Isolation", equipment: "Bodyweight", subcategory: "Calf", muscles: ["CF"] },
  { id: "tib-raise", name: "Tibialis Raise", bodyPart: "Legs", category: "Isolation", equipment: "Band", subcategory: "Tibialis", muscles: ["TI"] },
  { id: "step-up", name: "Box Step Up", bodyPart: "Legs", category: "Compound", equipment: "Dumbbell", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "icarian-leg-press", name: "Icarian Leg Press", bodyPart: "Legs", category: "Compound", equipment: "Machine", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "monkey-squat", name: "Assisted Pistol Squat", bodyPart: "Legs", category: "Compound", equipment: "Bodyweight", subcategory: "Quad", muscles: ["QD", "GL"] },
  { id: "deficit-reverse-lunge", name: "Deficit Reverse Lunge", bodyPart: "Legs", category: "Compound", equipment: "Dumbbell", subcategory: "Quad", muscles: ["GL", "QD"] },

  // Arms (30+)
  { id: "standing-bicep-curl", name: "Standing DB Bicep Curl", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Bicep", muscles: ["BI", "BR"] },
  { id: "barbell-curl", name: "EZ Barbell Curl", bodyPart: "Arms", category: "Isolation", equipment: "EZ Bar", subcategory: "Bicep", muscles: ["BI"] },
  { id: "hammer-curl", name: "Hammer Curl", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Bicep", muscles: ["BI", "BR"] },
  { id: "concentration-curl", name: "Concentration Curl", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Bicep", muscles: ["BI"] },
  { id: "preacher-curl", name: "Preacher Curl Machine", bodyPart: "Arms", category: "Isolation", equipment: "Machine", subcategory: "Bicep", muscles: ["BI"] },
  { id: "kb-curl", name: "Kettlebell Bicep Curl", bodyPart: "Arms", category: "Isolation", equipment: "Kettlebell", subcategory: "Bicep", muscles: ["BI"] },
  { id: "chin-up-arms", name: "Chin Up (Bicep Focus)", bodyPart: "Arms", category: "Compound", equipment: "Bodyweight", subcategory: "Bicep", muscles: ["BI", "LT"] },
  { id: "pushdown-straightbar", name: "Tricep Pushdown Straight Bar", bodyPart: "Arms", category: "Isolation", equipment: "Cable", subcategory: "Tricep", muscles: ["TR"] },
  { id: "pushdown-rope", name: "Tricep Pushdown Rope", bodyPart: "Arms", category: "Isolation", equipment: "Cable", subcategory: "Tricep", muscles: ["TR"] },
  { id: "overhead-ext", name: "Overhead Cable Tricep Extension", bodyPart: "Arms", category: "Isolation", equipment: "Cable", subcategory: "Tricep", muscles: ["TR"] },
  { id: "skullcrusher", name: "EZ Bar Skullcrusher", bodyPart: "Arms", category: "Isolation", equipment: "EZ Bar", subcategory: "Tricep", muscles: ["TR"] },
  { id: "jm-press", name: "JM Press", bodyPart: "Arms", category: "Isolation", equipment: "Barbell", subcategory: "Tricep", muscles: ["TR"] },
  { id: "tricep-dip", name: "Bench Tricep Dip", bodyPart: "Arms", category: "Isolation", equipment: "Bodyweight", subcategory: "Tricep", muscles: ["TR"] },
  { id: "close-grip-pushup", name: "Close Grip Push Up", bodyPart: "Arms", category: "Compound", equipment: "Bodyweight", subcategory: "Tricep", muscles: ["TR", "CH"] },
  { id: "close-grip-bench", name: "Close Grip Bench Press", bodyPart: "Arms", category: "Compound", equipment: "Barbell", subcategory: "Tricep", muscles: ["TR", "CH"] },
  { id: "reverse-curl", name: "Reverse EZ Bar Curl", bodyPart: "Arms", category: "Isolation", equipment: "EZ Bar", subcategory: "Forearm", muscles: ["BR", "FR"] },
  { id: "wrist-curl", name: "Wrist Curl", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Forearm", muscles: ["FR"] },
  { id: "reverse-wrist-curl", name: "Reverse Wrist Curl", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Forearm", muscles: ["FR"] },
  { id: "plate-pinch", name: "Plate Pinch Hold", bodyPart: "Arms", category: "Isolation", equipment: "Plate", subcategory: "Forearm", muscles: ["GR"] },
  { id: "towel-pullup", name: "Towel Pull Up", bodyPart: "Arms", category: "Compound", equipment: "Bodyweight", subcategory: "Forearm", muscles: ["GR", "LT"] },
  { id: "incline-curl", name: "Incline Dumbbell Curl", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Bicep", muscles: ["BI"] },
  { id: "spider-curl", name: "Spider Curl", bodyPart: "Arms", category: "Isolation", equipment: "EZ Bar", subcategory: "Bicep", muscles: ["BI"] },
  { id: "drag-curl", name: "Drag Curl", bodyPart: "Arms", category: "Isolation", equipment: "Barbell", subcategory: "Bicep", muscles: ["BI"] },
  { id: "bayesian-cable-curl", name: "Bayesian Cable Curl", bodyPart: "Arms", category: "Isolation", equipment: "Cable", subcategory: "Bicep", muscles: ["BI"] },
  { id: "21s-bicep", name: "21s Bicep Curl", bodyPart: "Arms", category: "Isolation", equipment: "Barbell", subcategory: "Bicep", muscles: ["BI"] },
  { id: "machine-bicep-curl", name: "Machine Bicep Curl", bodyPart: "Arms", category: "Isolation", equipment: "Machine", subcategory: "Bicep", muscles: ["BI"] },
  { id: "band-bicep-curl", name: "Band Bicep Curl", bodyPart: "Arms", category: "Isolation", equipment: "Band", subcategory: "Bicep", muscles: ["BI"] },
  { id: "zottman-curl", name: "Zottman Curl", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Forearm", muscles: ["BI", "BR", "FR"] },
  { id: "cable-tricep-kickback", name: "Cable Tricep Kickback", bodyPart: "Arms", category: "Isolation", equipment: "Cable", subcategory: "Tricep", muscles: ["TR"] },
  { id: "db-overhead-ext", name: "Seated DB Overhead Extension", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Tricep", muscles: ["TR"] },
  { id: "french-press", name: "French Press", bodyPart: "Arms", category: "Isolation", equipment: "EZ Bar", subcategory: "Tricep", muscles: ["TR"] },
  { id: "rocking-tricep-pushdown", name: "Rocking Tricep Pushdown", bodyPart: "Arms", category: "Isolation", equipment: "Cable", subcategory: "Tricep", muscles: ["TR"] },
  { id: "diamond-dip", name: "Diamond Cut Tricep Dip", bodyPart: "Arms", category: "Isolation", equipment: "Bodyweight", subcategory: "Tricep", muscles: ["TR"] },
  { id: "ring-dip-tricep", name: "Ring Tricep Dip", bodyPart: "Arms", category: "Compound", equipment: "Rings", subcategory: "Tricep", muscles: ["TR", "CH"] },
  { id: "db-kickback", name: "Dumbbell Tricep Kickback", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Tricep", muscles: ["TR"] },
  { id: "pinch-grip", name: "Towel Pinch Grip Hold", bodyPart: "Arms", category: "Isolation", equipment: "Bodyweight", subcategory: "Forearm", muscles: ["GR"] },
  { id: "fat-grip-curl", name: "Fat Gripz Curl", bodyPart: "Arms", category: "Isolation", equipment: "Dumbbell", subcategory: "Forearm", muscles: ["FR", "GR"] },
  { id: "behind-back-wrist-curl", name: "Behind Back Wrist Curl", bodyPart: "Arms", category: "Isolation", equipment: "Barbell", subcategory: "Forearm", muscles: ["FR"] },


  // Core (40+)
  { id: "plank", name: "Forearm Plank", bodyPart: "Core", category: "Isometric", equipment: "Bodyweight", subcategory: "Anti-Extension", muscles: ["AB", "OB", "TR"] },
  { id: "side-plank", name: "Side Plank", bodyPart: "Core", category: "Isometric", equipment: "Bodyweight", subcategory: "Anti-Lateral Flexion", muscles: ["OB", "AB"] },
  { id: "hanging-leg-raise", name: "Hanging Leg Raise", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Reverse Flexion", muscles: ["AB", "HV"] },
  { id: "toes-to-bar", name: "Toes to Bar", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Reverse Flexion", muscles: ["AB", "OB"] },
  { id: "ab-wheel", name: "Ab Wheel Rollout", bodyPart: "Core", category: "Isolation", equipment: "Wheel", subcategory: "Anti-Extension", muscles: ["AB"] },
  { id: "dead-bug", name: "Dead Bug", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Anti-Extension", muscles: ["AB", "OB"] },
  { id: "bird-dog", name: "Bird Dog", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Anti-Rotation", muscles: ["AB", "LB", "ES"] },
  { id: "russian-twist", name: "Russian Twist", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Rotational", muscles: ["OB", "AB"] },
  { id: "pallof-press", name: "Pallof Press", bodyPart: "Core", category: "Isolation", equipment: "Cable", subcategory: "Anti-Rotation", muscles: ["OB", "AB"] },
  { id: "cable-crunch", name: "Kneeling Cable Crunch", bodyPart: "Core", category: "Isolation", equipment: "Cable", subcategory: "Trunk Flexion", muscles: ["AB"] },
  { id: "v-up", name: "V-Up", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Trunk Flexion", muscles: ["AB", "OB"] },
  { id: "leg-raise", name: "Lying Leg Raise", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Reverse Flexion", muscles: ["AB"] },
  { id: "flutter-kick", name: "Flutter Kick", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Reverse Flexion", muscles: ["AB"] },
  { id: "bicycle-crunch", name: "Bicycle Crunch", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Rotational", muscles: ["OB", "AB"] },
  { id: "mountain-climber", name: "Mountain Climber", bodyPart: "Core", category: "Compound", equipment: "Bodyweight", subcategory: "Anti-Rotation", muscles: ["AB", "OB"] },
  { id: "hollow-hold", name: "Hollow Body Hold", bodyPart: "Core", category: "Isometric", equipment: "Bodyweight", subcategory: "Anti-Extension", muscles: ["AB"] },
  { id: "l-sit", name: "L-Sit Hold", bodyPart: "Core", category: "Isometric", equipment: "Bodyweight", subcategory: "Trunk Flexion", muscles: ["AB", "HV"] },
  { id: "dragon-flag", name: "Dragon Flag", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Anti-Extension", muscles: ["AB"] },
  { id: "windshield-wiper", name: "Hanging Windshield Wiper", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Rotational", muscles: ["OB"] },
  { id: "farmer-carry", name: "Farmer's Carry Core Focus", bodyPart: "Core", category: "Compound", equipment: "Dumbbell", subcategory: "Anti-Rotation", muscles: ["AB", "OB", "GR"] },
  { id: "plank-db-drag", name: "Plank DB Drag", bodyPart: "Core", category: "Anti-Rotation", equipment: "Dumbbell", subcategory: "Anti-Extension", muscles: ["AB", "OB"] },
  { id: "side-plank-db-raise", name: "Side Plank DB Raise", bodyPart: "Core", category: "Anti-Rotation", equipment: "Dumbbell", subcategory: "Anti-Lateral Flexion", muscles: ["OB", "AB"] },
  { id: "dead-bug-db", name: "Weighted Dead Bug", bodyPart: "Core", category: "Anti-Rotation", equipment: "Dumbbell", subcategory: "Anti-Extension", muscles: ["AB", "OB"] },
  { id: "bird-dog-row", name: "Bird Dog Row", bodyPart: "Core", category: "Anti-Rotation", equipment: "Dumbbell", subcategory: "Anti-Rotation", muscles: ["AB", "LB", "ES"] },
  { id: "russian-twist-db", name: "Russian Twist with DB", bodyPart: "Core", category: "Anti-Rotation", equipment: "Dumbbell", subcategory: "Rotational", muscles: ["OB", "AB"] },
  { id: "woodchopper-db", name: "DB Woodchopper", bodyPart: "Core", category: "Anti-Rotation", equipment: "Dumbbell", subcategory: "Rotational", muscles: ["OB", "AB"] },
  { id: "hanging-knee-raise", name: "Hanging Knee Raise", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Reverse Flexion", muscles: ["AB"] },
  { id: "cable-woodchopper", name: "Cable Woodchopper", bodyPart: "Core", category: "Anti-Rotation", equipment: "Cable", subcategory: "Rotational", muscles: ["OB"] },
  { id: "band-pallof", name: "Band Pallof Press", bodyPart: "Core", category: "Anti-Rotation", equipment: "Band", subcategory: "Anti-Rotation", muscles: ["OB", "AB"] },
  { id: "rollout-kneeling", name: "Kneeling Ab Wheel Rollout", bodyPart: "Core", category: "Anti-Rotation", equipment: "Wheel", subcategory: "Anti-Extension", muscles: ["AB"] },
  { id: "reverse-crunch", name: "Reverse Crunch", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Reverse Flexion", muscles: ["AB"] },
  { id: "leg-raise-captain-chair", name: "Captain's Chair Leg Raise", bodyPart: "Core", category: "Isolation", equipment: "Machine", subcategory: "Reverse Flexion", muscles: ["AB", "HV"] },
  { id: "sprinter-situp", name: "Sprinter Sit Up", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Trunk Flexion", muscles: ["AB", "OB"] },
  { id: "db-side-bend", name: "DB Side Bend", bodyPart: "Core", category: "Isolation", equipment: "Dumbbell", subcategory: "Anti-Lateral Flexion", muscles: ["OB"] },
  { id: "farmer-walk-twist", name: "Farmer's Carry with Twist", bodyPart: "Core", category: "Anti-Rotation", equipment: "Dumbbell", subcategory: "Anti-Rotation", muscles: ["AB", "OB"] },
  { id: "kb-windmill", name: "Kettlebell Windmill", bodyPart: "Core", category: "Anti-Rotation", equipment: "Kettlebell", subcategory: "Rotational", muscles: ["OB", "AB"] },
  { id: "turkish-getup", name: "Turkish Get Up", bodyPart: "Core", category: "Compound", equipment: "Kettlebell", subcategory: "Anti-Extension", muscles: ["AB", "OB"] },
  { id: "ab-vacuum", name: "Stomach Vacuum", bodyPart: "Core", category: "Isometric", equipment: "Bodyweight", subcategory: "Anti-Extension", muscles: ["TA"] },
  { id: "hanging-scissor", name: "Hanging Scissor Kick", bodyPart: "Core", category: "Isolation", equipment: "Bodyweight", subcategory: "Reverse Flexion", muscles: ["AB"] },
  { id: "band-leg-raise", name: "Band Resisted Leg Raise", bodyPart: "Core", category: "Isolation", equipment: "Band", subcategory: "Reverse Flexion", muscles: ["AB"] },
  { id: "cable-leg-raise", name: "Cable Crunch Leg Raise", bodyPart: "Core", category: "Isolation", equipment: "Cable", subcategory: "Trunk Flexion", muscles: ["AB"] },
];

type Props = {
  onClose: () => void;
  onAdd: (exercise: LibraryExercise) => void;
};

export default function ExerciseLibraryModal({ onClose, onAdd }: Props) {
  const [query, setQuery] = useState("");
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [category, setCategory] = useState("all");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Popularity");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function toggleBodyPart(bp: BodyPart) {
    setBodyParts((prev) => {
      const next = prev.includes(bp) ? prev.filter((p) => p !== bp) : [...prev, bp];
      const validSubs = next.flatMap((p) => SUBCATEGORIES_BY_BODY_PART[p]);
      setSubcategories((subs) => subs.filter((s) => validSubs.includes(s)));
      return next;
    });
  }

  function toggleSubcategory(sub: string) {
    setSubcategories((prev) => (prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]));
  }

  function toggleEquipment(eq: string) {
    setEquipment((prev) => (prev.includes(eq) ? prev.filter((e) => e !== eq) : [...prev, eq]));
  }

  const availableSubcategories = bodyParts.length > 0
    ? [...new Set(bodyParts.flatMap((bp) => SUBCATEGORIES_BY_BODY_PART[bp]))]
    : [...new Set(BODY_PARTS.flatMap((bp) => SUBCATEGORIES_BY_BODY_PART[bp]))];

  const activeFilterCount =
    bodyParts.length + subcategories.length + equipment.length + (category !== "all" ? 1 : 0);

  const filtered = EXERCISES.filter((e) => {
    if (query && !e.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (bodyParts.length > 0 && !bodyParts.includes(e.bodyPart)) return false;
    if (category !== "all" && e.category !== category) return false;
    if (equipment.length > 0 && !equipment.includes(e.equipment)) return false;
    if (subcategories.length > 0 && !subcategories.includes(e.subcategory)) return false;
    return true;
  }).sort((a, b) => (sortBy === "Name" ? a.name.localeCompare(b.name) : 0));

  const chipClass = (active: boolean) =>
    `px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border transition-all ${
      active
        ? "bg-[#f4257b]/15 border-[#f4257b] text-[#f4257b]"
        : "bg-[#1a0f14] border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
    }`;

  const filterSections = (
    <>
      <div>
        <h4 className="text-[9px] font-bold text-[#00f3ff] tracking-[0.2em] uppercase mb-2">Body Part</h4>
        <div className="flex flex-wrap gap-1.5">
          {BODY_PARTS.map((bp) => (
            <button key={bp} onClick={() => toggleBodyPart(bp)} className={chipClass(bodyParts.includes(bp))}>
              {bp}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[9px] font-bold text-[#00f3ff] tracking-[0.2em] uppercase mb-2">Subcategory</h4>
        <div className="flex flex-wrap gap-1.5">
          {availableSubcategories.map((sub) => (
            <button key={sub} onClick={() => toggleSubcategory(sub)} className={chipClass(subcategories.includes(sub))}>
              {sub}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[9px] font-bold text-[#00f3ff] tracking-[0.2em] uppercase mb-2">Category</h4>
        <div className="flex flex-wrap gap-1.5">
          {(["all", "Compound", "Isolation", "Isometric", "Plyometric", "Anti-Rotation"] as const).map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={chipClass(category === cat)}>
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[9px] font-bold text-[#00f3ff] tracking-[0.2em] uppercase mb-2">Equipment</h4>
        <div className="flex flex-wrap gap-1.5">
          {EQUIPMENT_TYPES.map((eq) => (
            <button key={eq} onClick={() => toggleEquipment(eq)} className={chipClass(equipment.includes(eq))}>
              {eq}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center md:p-4"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-5xl h-[92dvh] md:max-h-[90vh] bg-[#0d060a] border border-[#f4257b]/40 rounded-t-2xl md:rounded-2xl shadow-[0_0_80px_rgba(244,37,123,0.2)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4 border-b border-[#f4257b]/20 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#f4257b] text-lg md:text-xl font-black uppercase tracking-[0.15em]">
              Exercise Library
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
              search
            </span>
            <input
              autoFocus
              type="text"
              placeholder="Search exercises..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#1a0f14] border border-[#f4257b]/20 rounded-xl pl-10 md:pl-12 pr-4 py-3 md:py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#f4257b]/50 transition-colors"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar — desktop only */}
          <aside className="hidden md:block w-52 shrink-0 border-r border-[#f4257b]/10 px-3 py-4 overflow-y-auto space-y-4">
            {filterSections}
          </aside>

          {/* Results */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Results header */}
            <div className="px-4 md:px-6 py-2.5 border-b border-[#f4257b]/10 flex items-center justify-between shrink-0 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded border transition-all text-[10px] font-bold uppercase tracking-wider shrink-0"
                  style={filtersOpen || activeFilterCount > 0
                    ? { background: "rgba(244,37,123,0.15)", borderColor: "#f4257b", color: "#f4257b" }
                    : { background: "#1a0f14", borderColor: "#374151", color: "#9ca3af" }}
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <span className="material-symbols-outlined leading-none" style={{ fontSize: 14 }}>tune</span>
                  Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
                </button>
                <p className="text-xs md:text-sm text-slate-400 truncate">
                  <span className="text-white font-bold">{filtered.length}</span> results
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden md:inline text-xs text-slate-500 uppercase tracking-wider">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#0d060a] border border-gray-700 rounded px-2 md:px-3 py-1 text-xs text-white focus:outline-none focus:border-[#f4257b] appearance-none cursor-pointer pr-6"
                  >
                    <option>Popularity</option>
                    <option>Name</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile filter panel */}
            {filtersOpen && (
              <div className="md:hidden border-b border-[#f4257b]/10 px-4 py-3 overflow-y-auto max-h-[40vh] space-y-4 bg-[#0d060a]">
                {filterSections}
              </div>
            )}

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-600">
                  <span className="material-symbols-outlined text-5xl">fitness_center</span>
                  <p className="text-sm">No exercises match your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {filtered.map((ex) => (
                    <div
                      key={ex.id}
                      className="bg-[#1a0f14] border border-white/5 rounded-xl overflow-hidden hover:border-[#f4257b]/30 transition-colors"
                    >
                      {/* Image */}
                      <div className="relative h-24 md:h-36 bg-[#0d060a] flex items-center justify-center">
                        {ex.image ? (
                          <img src={ex.image} alt={ex.name} className="w-full h-full object-cover opacity-80" />
                        ) : (
                          <span className="material-symbols-outlined text-4xl md:text-5xl text-gray-700">
                            fitness_center
                          </span>
                        )}
                        <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${EQUIPMENT_STYLES[ex.equipment]}`}>
                          {ex.equipment}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="p-2.5 md:p-3">
                        <h4 className="text-white font-bold text-xs md:text-sm leading-tight">{ex.name}</h4>
                        <p className="text-[#00f3ff] text-[10px] uppercase tracking-wider mt-0.5">
                          {ex.bodyPart} • {ex.subcategory}
                        </p>
                        <div className="flex items-center justify-between mt-2 md:mt-3">
                          <div className="flex -space-x-1.5">
                            {ex.muscles.slice(0, 4).map((m) => (
                              <div
                                key={m}
                                className="size-6 md:size-7 rounded-full bg-[#0d060a] border border-gray-700 flex items-center justify-center text-[8px] font-bold text-gray-400 font-mono"
                              >
                                {m}
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => onAdd(ex)}
                            className="px-2.5 md:px-3 py-1.5 bg-[#f4257b] hover:bg-[#f4257b]/90 text-white text-xs font-black uppercase tracking-wider rounded hover:shadow-[0_0_15px_rgba(244,37,123,0.5)] transition-all flex items-center gap-0.5"
                          >
                            Add
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
