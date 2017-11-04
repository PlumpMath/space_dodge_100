sfont = {}
sfont.chars = {}

function sfont.write(words, x, y)
  words = string.lower(words)

  for c in words:gmatch(".") do
    if c ~= " " then
      draw_object(sfont.get_character(c), x, y)
    end

    x = x + 1
  end
end

function sfont.get_character(c)
  if sfont.chars[c] then
    return sfont.chars[c]
  else
    sfont.chars[c] = love.graphics.newImage("images/alphabet/" .. c .. ".png")
    return sfont.chars[c]
  end
end
