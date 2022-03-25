# Generated by Django 4.0 on 2022-03-25 13:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("user", "0001_initial"),
        ("feed", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="feedlike",
            name="user_id",
            field=models.ForeignKey(
                db_column="user_id",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="feed_like",
                to="user.users",
            ),
        ),
        migrations.AddField(
            model_name="feedcomment",
            name="feed_id",
            field=models.ForeignKey(
                db_column="feed_id",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="feed_comment",
                to="feed.feed",
            ),
        ),
        migrations.AddField(
            model_name="feedcomment",
            name="user_id",
            field=models.ForeignKey(
                db_column="user_id",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="feed_comment",
                to="user.users",
            ),
        ),
        migrations.AddField(
            model_name="feedbookmark",
            name="feed_id",
            field=models.ForeignKey(
                db_column="feed_id",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="feed_bookmark",
                to="feed.feed",
            ),
        ),
        migrations.AddField(
            model_name="feedbookmark",
            name="user_id",
            field=models.ForeignKey(
                db_column="user_id",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="feed_bookmark",
                to="user.users",
            ),
        ),
        migrations.AddField(
            model_name="feed",
            name="user_id",
            field=models.ForeignKey(
                db_column="user_id", on_delete=django.db.models.deletion.CASCADE, related_name="feed", to="user.users"
            ),
        ),
        migrations.AddConstraint(
            model_name="feedlike",
            constraint=models.UniqueConstraint(fields=("user_id", "feed_id"), name="unique_user_feedlike"),
        ),
        migrations.AddConstraint(
            model_name="feedbookmark",
            constraint=models.UniqueConstraint(fields=("user_id", "feed_id"), name="unique_user_feedbookmark"),
        ),
    ]
