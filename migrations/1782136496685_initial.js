/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    name: { type: "varchar(255)", notNull: true },
    email: { type: "varchar(255)", notNull: true, unique: true },
    password_hash: { type: "varchar(255)", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("user_courses", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },
    code: { type: "varchar(255)", notNull: true },
    name: { type: "varchar(255)", notNull: true },
    link: { type: "varchar(255)" },
  });

  pgm.createType("task_status", [
    "not_started",
    "started",
    "handed_in",
    "completed",
    "retake",
  ]);
  pgm.createTable("user_course_tasks", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    user_course_id: {
      type: "uuid",
      notNull: true,
      references: "user_courses",
      onDelete: "CASCADE",
    },
    name: { type: "varchar(255)", notNull: true },
    description: { type: "varchar(255)" },
    deadline: { type: "timestamp" },
    location: { type: "varchar(255)" },
    link: { type: "varchar(255)" },
    comment: { type: "text" },
    status: {
      type: "task_status",
      notNull: true,
      default: "not_started",
      onDelete: "CASCADE",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("user_course_tasks");
  pgm.dropTable("user_courses");
  pgm.dropType("task_status");
  pgm.dropTable("users");
};
