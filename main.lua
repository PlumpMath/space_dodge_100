-- Original sizes
-- Character: 8 pixels tall, 6 pixels wide
-- Screen: 64 pixels tall (8 characters)

-- Constants

scale = 10
char_width = 6
char_height = 8
window_cols = 6
window_rows = 8
block_cols = 6
block_rows = 8
empty_c = 0
block_c = 1

-- Love stuff

function love.load()
  -- Set up window
  love.window.setMode(window_cols * char_width * scale, window_rows * char_height * scale)
  love.window.setTitle("Space Dodge")
  love.graphics.setDefaultFilter("nearest", "nearest") -- no blurring

  -- Images

  background = love.graphics.newImage("images/background.png")
  block_image = love.graphics.newImage("images/block.png")
  dead_image = love.graphics.newImage("images/dead.png")

  -- Game state

  initialize_game()
end

function love.draw()
  -- Draw background

  love.graphics.draw(background)

  if ship.dead then
    -- Draw death

    draw_object(dead_image, 1, 1)
  else
    -- Draw blocks

    for y = 1, block_rows do
      for x = 1, block_cols do
        if blocks[y][x] == block_c then
          draw_object(block_image, x, y)
        end
      end
    end

    -- Draw ship

    draw_object(ship.image, ship.x, ship.y)
  end
end

function love.update(dt)
  -- Update blocks at discrete time intervals

  total_time = total_time + dt

  if not ship.dead then
    if total_time > step_time then
      total_time = 0
      update_blocks()
      check_collision()
    end
  end
end

function love.keypressed(key)
  if key == "right" and ship.x < block_cols then
    ship.x = ship.x + 1
  elseif key == "left" and ship.x > 1 then
    ship.x = ship.x - 1
  elseif key == "up" and ship.y > 1 then
    ship.y = ship.y - 1
  elseif key == "down" and ship.y < block_rows then
    ship.y = ship.y + 1
  elseif key == "escape" then
    love.event.push("quit")
  elseif ship.dead then
    initialize_game()
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
end

function check_collision()
  if blocks[ship.y][ship.x] == block_c then
    ship.dead = true
  end
end

-- Helpers

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
