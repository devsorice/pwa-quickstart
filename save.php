<?php
file_put_contents('log.txt', file_get_contents('php://input')."\r\n".json_encode($_SERVER)."\r\n\r\n\r\n\r\n", FILE_APPEND | LOCK_EX);