-- Original sizes
-- Character: 8 pixels tall, 6 pixels wide
-- Screen: 64 pixels tall (8 characters)

require "sfont"

-- Constants

scale = 10
char_width = 6
char_height = 8
window_cols = 14
window_rows = 8
block_cols = 6
block_rows = 8
empty_c = 0
block_c = 1

-- Love stuff

function love.load()
  -- Set up window
  love.window.setMode(window_cols * char_width * scale, window_rows * char_height * scale)
  love.window.setTitle("Space Dodge 100")
  love.graphics.setDefaultFilter("nearest", "nearest") -- no blurring
  love.window.setIcon(love.graphics.newImage("images/ship.png"):getData())

  -- Images

  background = love.graphics.newImage("images/background.png")
  block_image = love.graphics.newImage("images/block.png")
  checker_image = love.graphics.newImage("images/checker.png")
  block_batch = love.graphics.newSpriteBatch(block_image, 48, "dynamic")

  bg_canvas = setup_canvas()

  -- Game state

  initialize_game()
  show_start()
end

function love.draw()
  love.graphics.draw(bg_canvas)

  if start_screen then
    show_start()
    return
  elseif ship.dead then
    show_death()
  else
    draw_blocks()
    draw_object(ship.image, ship.x, ship.y)
  end

  -- Draw score

  sfont.write(tostring(level), 9, 2)

  sfont.write(tostring(score), 9, 5)

  sfont.write(tostring(high_score), 9, 8)
end

function love.update(dt)
  if paused then
    return
  end

  -- Update blocks at discrete time intervals

  total_time = total_time + dt

  if not ship.dead then
    if total_time > step_time then
      total_time = 0
      update_blocks()
      check_collision()

      update_score()
      update_level()
    end
  end
end

function love.keypressed(key)
  if ship.dead or start_screen then
    if key == "escape" then
      love.event.push("quit")
    elseif key ~= "right" and
      key ~= "left" and
      key ~= "up" and
      key ~= "down" and
      key ~= "a" and
      key ~= "s" and
      key ~= "w" and
      key ~= "d" then

      start_screen = false
      unpause()
      initialize_game()
    end
  elseif paused then
    unpause()
  elseif key == "p" then
    pause()
  else
    if (key == "right" or key == "d") and ship.x < block_cols then
      ship.x = ship.x + 1
    elseif (key == "left" or key == "a") and ship.x > 1 then
      ship.x = ship.x - 1
    elseif (key == "up" or key == "w") and ship.y > 1 then
      ship.y = ship.y - 1
    elseif (key == "down" or key == "s") and ship.y < block_rows then
      ship.y = ship.y + 1
    elseif key == "escape" then
      love.event.push("quit")
    end
  end

  check_collision()
end

-- Game stuff

function initialize_game()
  -- Initialize ship

  ship = {
    dead = false;
    x = block_cols / 2;
    y = block_rows;
    image = love.graphics.newImage("images/ship.png");
  }

  -- Set up blocks

  blocks = {}

  for y = 1, block_rows do
    blocks[y] = {}

    for x = 1, block_cols do
      blocks[y][x] = empty_c
    end
  end

  block_probability = 20

  -- Time

  total_time = 0
  step_time = 1
  score = 0
  level = 1

  if high_score == nil then
    high_score = 0
  end
end

function check_collision()
  if blocks[ship.y][ship.x] == block_c then
    ship.dead = true
  end
end

function update_score()
  score = score + 1

  if score > high_score then
    high_score = score
  end
end

local levels = {
  [20] = 0.80;
  [40] = 0.70;
  [60] = 0.60;
  [75] = 0.50;
  [100] = 0.40;
  [150] = 0.35;
  [200] = 0.30;
  [250] = 0.25;
  [300] = 0.20;
  [400] = 0.15;
}

function update_level()
  if levels[score] then
    step_time = levels[score]
    level = level + 1
  end
end

function show_death()
  sfont.write("ship", 1, 1)
  sfont.write("lost", 1, 2)
  sfont.write("try", 1, 4)
  sfont.write("again", 1, 5)
end

function show_start()
  start_screen = true
  paused = true
  sfont.write("press", 1, 2)
  sfont.write("enter", 1, 3)
  sfont.write(" to ", 1, 4)
  sfont.write("start", 1, 5)
end

function pause()
  paused = true
end

function unpause()
  paused = false
end

function draw_blocks()
  for y = 1, block_rows do
    for x = 1, block_cols do
      if blocks[y][x] == block_c then
        add_block(x, y)
      end
    end
  end

  love.graphics.draw(block_batch, 0, 0)
  block_batch:clear()
end

-- Helpers

function setup_canvas()
  local canvas = love.graphics.newCanvas(window_cols * char_width * scale, window_rows * char_height * scale)
  love.graphics.setCanvas(canvas)

  love.graphics.draw(background)

  for y = 1, block_rows do
    draw_object(checker_image, 7, y) -- divider
  end

  sfont.write("level", 9, 1)

  sfont.write("score", 9, 4)

  sfont.write("high", 9, 7)

  love.graphics.setCanvas()

  return canvas
end

function add_block(x, y)
  x = (x - 1) * char_width * scale
  y = (y - 1) * char_height * scale

  block_batch:add(x, y, 0, scale, scale)
end

function draw_object(image, x, y)
  -- Scale coordinates

  x = (x - 1) * char_width * scale
  y = (y - 1) * char_height * scale

  -- Draw image

  love.graphics.draw(image, x, y, 0, scale, scale)
end

function update_blocks()
  -- Update all but first row, starting at bottom

  for y = block_rows, 2, -1 do
    for x = 1, block_cols do
      blocks[y][x] = blocks[y - 1][x]
    end
  end

  -- Update first row randomly

  for x = 1, block_cols do
    if love.math.random(100) < block_probability then
      blocks[1][x] = block_c
    else
      blocks[1][x] = empty_c
    end
  end
end
