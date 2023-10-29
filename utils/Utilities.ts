import { supabase } from "../supabase";
import { useState } from "react";

type WasherStatus = {
  washer_uuid: string;
  status: number;
};

type DryerStatus = {
  dryer_uuid: string;
  status: number;
};

export function useWashersStatus(hall_id: string) {
  const [data, setData] = useState<WasherStatus[]>();

  async function fetchLaundryMachineStatus() {
    const { data, error } = await supabase
      .from("washers")
      .select("*")
      .eq("hall_id", hall_id);

    if (error) {
      throw new Error(error.message);
    } else if (data) {
      setData(data as WasherStatus[]);
    }
  }

  fetchLaundryMachineStatus();
  return [data];
}

export function useDryersStatus(hall_uuid: string) {
  const [data, setData] = useState<DryerStatus[]>();

  async function fetchLaundryMachineStatus() {
    const { data, error } = await supabase
      .from("dryers")
      .select("*")
      .eq("hall_uuid", hall_uuid);

    if (error) {
      throw new Error(error.message);
    } else if (data) {
      setData(data as DryerStatus[]);
    }
  }

  fetchLaundryMachineStatus();
  return [data];
}
