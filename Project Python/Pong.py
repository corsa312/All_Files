import pygame
import random

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong com IA Balanceada")

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

paddle_width, paddle_height = 15, 100
ball_radius = 10

player1 = pygame.Rect(50, HEIGHT//2 - paddle_height//2, paddle_width, paddle_height)
player2 = pygame.Rect(WIDTH - 65, HEIGHT//2 - paddle_height//2, paddle_width, paddle_height)
ball = pygame.Rect(WIDTH//2 - ball_radius, HEIGHT//2 - ball_radius, ball_radius*2, ball_radius*2)

ball_speed_x, ball_speed_y = 6 * random.choice((1, -1)), 6 * random.choice((1, -1))
player_speed = 8
ia_speed = 8  # Aumentamos a velocidade da IA para reagir melhor
reaction_delay = 5  # Reduzimos o atraso da IA

player1_velocity = 0
player1_score = 0
player2_score = 0
font = pygame.font.Font(None, 36)

clock = pygame.time.Clock()

running = True
while running:
    screen.fill(BLACK)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    player1_velocity = (keys[pygame.K_s] - keys[pygame.K_w]) * player_speed
    player1.y += player1_velocity

    # Movimento da IA melhorado
    if player2.y + paddle_height//2 < ball.y - random.randint(5, 20):
        player2.y += ia_speed
    elif player2.y + paddle_height//2 > ball.y + random.randint(5, 20):
        player2.y -= ia_speed

    player1.y = max(0, min(HEIGHT - paddle_height, player1.y))
    player2.y = max(0, min(HEIGHT - paddle_height, player2.y))

    ball.x += ball_speed_x
    ball.y += ball_speed_y

    if ball.y <= 0 or ball.y >= HEIGHT - ball_radius * 2:
        ball_speed_y *= -1

    if ball.colliderect(player1) or ball.colliderect(player2):
        ball_speed_x *= -1.05
        ball_speed_y *= 1.05

    if ball.x <= 0:
        player2_score += 1
        ball.x, ball.y = WIDTH//2 - ball_radius, HEIGHT//2 - ball_radius
        ball_speed_x, ball_speed_y = 6 * random.choice((1, -1)), 6 * random.choice((1, -1))

    if ball.x >= WIDTH:
        player1_score += 1
        ball.x, ball.y = WIDTH//2 - ball_radius, HEIGHT//2 - ball_radius
        ball_speed_x, ball_speed_y = 6 * random.choice((1, -1)), 6 * random.choice((1, -1))

    pygame.draw.rect(screen, WHITE, player1)
    pygame.draw.rect(screen, WHITE, player2)
    pygame.draw.ellipse(screen, WHITE, ball)

    score_text = font.render(f"Jogador: {player1_score}  IA: {player2_score}", True, WHITE)
    screen.blit(score_text, (WIDTH//2 - 80, 20))

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
