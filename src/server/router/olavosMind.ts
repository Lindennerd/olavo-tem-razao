import { z } from "zod";
import {
  areList,
  TodoList,
  WhoList,
  WorkingWithList,
} from "../../lib/generator";
import { createRouter } from "./context";
export const olavosMindRouter = createRouter().query("getOlavosMind", {
  async resolve({ ctx }) {
    return {
      who: WhoList(),
      are: areList(),
      workingWith: WorkingWithList(),
      todo: TodoList(),
    };
  },
});
