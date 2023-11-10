import { supabase } from "../supabase";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type WasherStatus = {
  washer_uuid: string;
  status: number;
};

type DryerStatus = {
  dryer_uuid: string;
  status: number;
};

type User = {
  user_uuid: string;
  first_name: string | null;
  last_name: string | null;
  hall_uuid: string | null;
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

export function useFetchUser(userUuid: string) {
  const [data, setData] = useState<User | null>(null);

  async function fetchUser() {
    const { data, error } = await supabase
      .from("users")
      .select("*, hall_uuid:halls(*)")
      .eq("user_uuid", userUuid)
      .single();

    if (error) {
      throw new Error(error.message);
    } else if (data) {
      setData(data);
    }
  }

  fetchUser();
  return [data];
}

// {
//     "user_uuid": "4520eb4f-a623-4ae2-882b-8e01863e6477",
//     "first_name": null,
//     "last_name": null,
//     "hall_uuid": {
//         "hall_id": "aadbd2f3-016a-4c32-b3ae-0a964acaa797",
//         "hall_name": "snow",
//         "customer": "uconn"
//     }
// }

export default async function useStoreData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
}
