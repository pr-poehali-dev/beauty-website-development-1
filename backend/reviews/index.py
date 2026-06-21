import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Получение и добавление отзывов для салона красоты Малина."""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if event.get('httpMethod') == 'GET':
        cur.execute("""
            SELECT id, name, service, rating, text, created_at
            FROM reviews
            ORDER BY created_at DESC
            LIMIT 50
        """)
        rows = cur.fetchall()
        reviews = [
            {
                'id': r[0],
                'name': r[1],
                'service': r[2],
                'rating': r[3],
                'text': r[4],
                'created_at': r[5].isoformat(),
            }
            for r in rows
        ]
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'reviews': reviews})}

    if event.get('httpMethod') == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = (body.get('name') or '').strip()[:100]
        service = (body.get('service') or '').strip()[:150]
        rating = int(body.get('rating') or 5)
        text = (body.get('text') or '').strip()

        if not name or not text or rating < 1 or rating > 5:
            cur.close()
            conn.close()
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Заполните имя и текст отзыва'})}

        cur.execute(
            "INSERT INTO reviews (name, service, rating, text) VALUES (%s, %s, %s, %s) RETURNING id",
            (name, service or None, rating, text)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 201, 'headers': headers, 'body': json.dumps({'id': new_id, 'success': True})}

    return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}
