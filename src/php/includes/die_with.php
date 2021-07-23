<?php

function dieWithBadRequest($errorMessages)
{
  http_response_code(400);
  echo json_encode(is_array($errorMessages) ? $errorMessages : array($errorMessages));
  die ();
}

function dieWithNotFound($errorMessages)
{
  http_response_code(404);
  echo json_encode(is_array($errorMessages) ? $errorMessages : array($errorMessages));
  die ();
}

?>
