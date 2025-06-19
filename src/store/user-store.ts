import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserI {}

export default create<UserI>()((set) => ({}));
