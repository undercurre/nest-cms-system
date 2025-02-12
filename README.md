```sql
CREATE TABLE `cookbook` (
  `id` char(36) NOT NULL COMMENT '食谱ID',
  `time` int NOT NULL COMMENT '用时',
  `difficulty` int NOT NULL COMMENT '难度',
  `category` varchar(50) NOT NULL COMMENT '食谱类别',
  `description` text COMMENT '详情描述',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='食谱表';
```
