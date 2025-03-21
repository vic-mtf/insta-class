import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
} from "@mui/material";
import insertText from "../../../../../utils/insertText";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import EmojiAdornment from "./EmojiAdornment";
import { useForm } from "react-hook-form";
import useSocket from "../../../../../hooks/useSocket";
import PropTypes from "prop-types";

export default function ChatBoxTextField({ id }) {
  const target = useSelector((store) => store.user.discussion.selected);
  const socket = useSocket();
  const formRef = useRef();
  const editorRef = useRef();
  const {
    register,
    handleSubmit,

    formState: { isValid },
  } = useForm();

  const textFieldRef = useRef();

  useEffect(() => {
    const inputElement = textFieldRef.current?.querySelector("textarea");

    if (target && textFieldRef.current) {
      inputElement.setAttribute("readonly", "readonly");
      setTimeout(() => {
        inputElement.focus();
        inputElement.removeAttribute("readonly");
      }, 100);
    }
  }, [target]);

  const handleSend = ({ message: content }) => {
    editorRef.current.value = "";

    const message = {
      content,
      type: "text",
      target,
      id,
      createdAt: new Date().toISOString(),
    };
    socket.emit("send-message", message);
  };

  return (
    <Box width='100%'>
      <Toolbar
        component='form'
        ref={formRef}
        onSubmit={handleSubmit(handleSend)}
        sx={{
          gap: 1,
          px: 1,
          flexDirection: {
            xs: "row",
            md: "row-reverse",
          },
        }}
        disableGutters>
        <TextField
          variant='outlined'
          type='text'
          multiline
          fullWidth
          inputRef={editorRef}
          size='small'
          onKeyDown={(e) => {
            if (e.key === "Enter" && (!e?.shiftKey || !e?.ctrlKey)) {
              e.preventDefault();
              formRef.current.dispatchEvent(
                new Event("submit", {
                  bubbles: true,
                  cancelable: true,
                })
              );
            }
          }}
          sx={{ overflow: "hidden", p: 0, m: 0 }}
          maxRows={4}
          placeholder='Ecrire votre message...'
          {...register("message", {
            required: true,
            validate(value) {
              return !!value;
            },
          })}
          slotProps={{
            input: {
              ref: textFieldRef,
              sx: {
                overflow: "hidden",
                borderRadius: 2,
              },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    disabled={!isValid}
                    type='submit'
                    onMouseDown={(e) => e.preventDefault()}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position='start'>
                  <EmojiAdornment
                    onClick={({ emoji }) => {
                      const inputElement =
                        textFieldRef.current?.querySelector("textarea");
                      insertText(inputElement, emoji);
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Toolbar>
    </Box>
  );
}

ChatBoxTextField.propTypes = {
  id: PropTypes.string.isRequired,
};
