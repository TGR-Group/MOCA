from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '09bcc30ea9e4'
down_revision = '7e10841bd8cf'
branch_labels = None
depends_on = None


def upgrade():
    # Drop the Evaluations table
    op.drop_table('evaluations')
    
    # Add the stock_status column to Classes table
    with op.batch_alter_table('classes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stock_status', sa.Enum('Low', 'Medium', 'High', name='stockstatus'), nullable=True))
    
    # Update existing data in stock_status column to use three levels
    conn = op.get_bind()
    conn.execute("""
        UPDATE classes 
        SET stock_status = CASE 
            WHEN stock_status = '在庫あり' THEN 'High'
            WHEN stock_status = '在庫少なめ' THEN 'Medium'
            ELSE 'Low'
        END;
    """)


def downgrade():
    # Recreate the Evaluations table
    op.create_table('evaluations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('class_id', sa.Integer(), nullable=False),
    sa.Column('evaluation', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['class_id'], ['classes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    
    # Revert stock_status column to original state
    with op.batch_alter_table('classes', schema=None) as batch_op:
        batch_op.drop_column('stock_status')
    
    # Revert data in stock_status column if needed (no data to revert as column is dropped)
