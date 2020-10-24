import hashlib
import base64
import struct

WS_MAGIC_STRING = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"

FIN = 0x80
OPCODE = 0x0F
MASKED = 0x80
PAYLOAD_LEN = 0x7F
PAYLOAD_LEN_EXT16 = 0x7E
PAYLOAD_LEN_EXT64 = 0x7F

OPCODE_TEXT = 0x1
OPCODE_CLOSE_CONN = 0x8


def send_handshake(key: str) -> bytes:
    full_key = (key + WS_MAGIC_STRING).encode("utf-8")
    resp_key = base64.standard_b64encode(hashlib.sha1(full_key).digest()).decode(
        "utf-8"
    )

    request = (
        "HTTP/1.1 101 Switching Protocols\r\n"
        + "Upgrade: websocket\r\n"
        + "Connection: Upgrade\r\n"
        + "Sec-WebSocket-Accept: {}\r\n\r\n".format(resp_key)
    )

    return request.encode("utf-8")


def get_frame_opcode(frame: bytearray) -> int:
    return frame[0] % 16


def is_close_frame(frame: bytearray) -> bool:
    return get_frame_opcode(frame) == OPCODE_CLOSE_CONN


def read_text(payload: bytearray, masks: bytearray) -> str:
    message_bytes = bytearray()
    for message_byte in payload:
        message_byte ^= masks[len(message_bytes) % 4]
        message_bytes.append(message_byte)

    return message_bytes.decode("utf-8")


def send_text(payload: str) -> bytearray:
    header = bytearray()
    payload_length = len(payload)

    # Normal payload
    if payload_length <= 125:
        header.append(FIN | OPCODE_TEXT)
        header.append(payload_length)

    # Extended payload
    elif payload_length >= 126 and payload_length <= 65535:
        header.append(FIN | OPCODE_TEXT)
        header.append(PAYLOAD_LEN_EXT16)
        header.extend(struct.pack(">H", payload_length))

    # Huge extended payload
    elif payload_length < 18446744073709551616:
        header.append(FIN | OPCODE_TEXT)
        header.append(PAYLOAD_LEN_EXT64)
        header.extend(struct.pack(">Q", payload_length))

    else:
        raise Exception("Payload is too big.")

    return header + payload.encode("utf-8")
