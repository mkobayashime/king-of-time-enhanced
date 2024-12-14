import * as v from "valibot";

export const constsSchema = v.object({
  api: v.object({
    gatewayBase: v.string(),
    version: v.string(),
  }),
  token: v.object({
    token: v.string(),
    userToken: v.string(),
  }),
  recordButtons: v.array(
    v.object({
      name: v.string(),
      id: v.string(),
    }),
  ),
});

export type Consts = v.InferInput<typeof constsSchema>;
