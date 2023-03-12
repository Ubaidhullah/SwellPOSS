import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
} from "@pankod/refine-mui";

import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const Form = ({
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  itemImage,
}: FormProps) => {
  return (
      <Box>
          <Typography fontSize={25} fontWeight={700} color="#4c4f4d">
              {type} a Item
          </Typography>

          <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#4c4f4d">
              <form
                  style={{
                      marginTop: "20px",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                  }}
                  onSubmit={handleSubmit(onFinishHandler)}
              >
                  <FormControl>
                      <FormHelperText
                          sx={{
                              fontWeight: 500,
                              margin: "10px 0",
                              fontSize: 16,
                              color: "#11142d",
                          }}
                      >
                          Enter Item name
                      </FormHelperText>
                      <TextField sx={{ input: { color: '' }} }
                          fullWidth
                          required
                          id="outlined-basic"
                          color="info"
                          variant="outlined"
                          {...register("title", { required: true })}
                      />
                  </FormControl>
                  <FormControl>
                      <FormHelperText
                          sx={{
                              fontWeight: 500,
                              margin: "10px 0",
                              fontSize: 16,
                              color: "#11142d",
                          }}
                      >
                          Enter Description
                      </FormHelperText>
                      <TextareaAutosize
                          minRows={5}
                          required
                          placeholder="Write description"
                          color="info"
                          style={{
                              width: "100%",
                              background: "transparent",
                              fontSize: "16px",
                              borderColor: "rgba(0,0,0,0.23)",
                              borderRadius: 6,
                              padding: 10,
                              color: "#919191",
                          }}
                          {...register("description", { required: true })}
                      />
                  </FormControl>

                  <Stack direction="row" gap={4}>
                      <FormControl sx={{ flex: 1 }}>
                          <FormHelperText
                              sx={{
                                  fontWeight: 500,
                                  margin: "10px 0",
                                  fontSize: 16,
                                  color: "#11142d",
                              }}
                          >
                              Select Item Type
                          </FormHelperText>
                          <Select
                              variant="outlined"
                              color="info"
                              displayEmpty
                              required
                              inputProps={{ "aria-label": "Without label" }}
                              defaultValue="apartment"
                              {...register("propertyType", {
                                  required: true,
                              })}
                          >
                              <MenuItem value="apartment">Food</MenuItem>
                              <MenuItem value="villa">Toys</MenuItem>
                              <MenuItem value="farmhouse">Cages</MenuItem>
                              <MenuItem value="condos">Live Birds</MenuItem>
                              <MenuItem value="townhouse">WholeSale</MenuItem>
                              <MenuItem value="duplex">Medicine</MenuItem>
                              <MenuItem value="studio">Goods</MenuItem>
                              <MenuItem value="chalet">Bads</MenuItem>
                          </Select>
                      </FormControl>
                      <FormControl>
                          <FormHelperText
                              sx={{
                                  fontWeight: 500,
                                  margin: "10px 0",
                                  fontSize: 16,
                                  color: "#11142d",
                              }}
                          >
                              Enter Item price
                          </FormHelperText>
                          <TextField
                              fullWidth
                              required
                              id="outlined-basic"
                              color="info"
                              type="number"
                              variant="outlined"
                              {...register("price", { required: true })}
                          />
                      </FormControl>
                  </Stack>

                  <FormControl>
                      <FormHelperText
                          sx={{
                              fontWeight: 500,
                              margin: "10px 0",
                              fontSize: 16,
                              color: "#11142d",
                          }}
                      >
                          Enter Item Code
                      </FormHelperText>
                      <TextField
                          fullWidth
                          required
                          id="outlined-basic"
                          color="info"
                          variant="outlined"
                          {...register("ItemCode", { required: true })}
                      />
                  </FormControl>

                  <Stack
                      direction="column"
                      gap={1}
                      justifyContent="center"
                      mb={2}
                  >
                      <Stack direction="row" gap={2}>
                          <Typography
                              color="#11142d"
                              fontSize={16}
                              fontWeight={500}
                              my="10px"
                          >
                              Item Photo
                          </Typography>

                          <Button
                              component="label"
                              sx={{
                                  width: "fit-content",
                                  color: "#2ed480",
                                  textTransform: "capitalize",
                                  fontSize: 16,
                              }}
                          >
                              Upload *
                              <input
                                  hidden
                                  accept="image/*"
                                  type="file"
                                  onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>,
                                  ) => {
                                      handleImageChange(e.target.files![0]);
                                  }}
                              />
                          </Button>
                      </Stack>
                      <Typography
                          fontSize={14}
                          color="#808191"
                          sx={{ wordBreak: "break-all" }}
                      >
                          {itemImage?.name}
                      </Typography>
                  </Stack>

                  <CustomButton
                      type="submit"
                      title={formLoading ? "Submitting..." : "Submit"}
                      backgroundColor="#475be8"
                      color="#fcfcfc"
                  />
              </form>
          </Box>
      </Box>
  );
};

export default Form;